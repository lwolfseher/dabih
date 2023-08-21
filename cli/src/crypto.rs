use std::path::PathBuf;

use crate::config::Context;
use anyhow::bail;
use anyhow::Result;
use openssl::rsa::Rsa;
use openssl::symm::decrypt;
use openssl::symm::Cipher;
use std::fs::File;
use std::io::Write;

use openssl::{encrypt::Decrypter, hash::MessageDigest, pkey::PKey, rsa::Padding};

use crate::api::Chunk;
use base64::{engine::general_purpose, Engine as _};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Jwk {
    kty: String,
    n: String,
    e: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct RootKeys {
    #[serde(rename = "rootKeys")]
    root_keys: Vec<Jwk>,
}

pub fn decrypt_key(ctx: &Context, key: &String) -> Result<Vec<u8>> {
    let data = openssl::base64::decode_block(key)?;
    let pkey = PKey::from_rsa(ctx.private_key.clone())?;
    let mut decrypter = Decrypter::new(&pkey)?;
    decrypter.set_rsa_padding(Padding::PKCS1_OAEP)?;
    decrypter.set_rsa_oaep_md(MessageDigest::sha256())?;

    let len = decrypter.decrypt_len(&data)?;
    let mut decrypted = vec![0u8; len];

    let dlen = decrypter.decrypt(&data, &mut decrypted)?;
    decrypted.truncate(dlen);

    Ok(decrypted)
}

pub fn decrypt_chunk(chunk: &Chunk, key: &Vec<u8>, data: &Vec<u8>) -> Result<Vec<u8>> {
    let cipher = Cipher::aes_256_cbc();
    let iv = openssl::base64::decode_block(&chunk.iv)?;
    let decrypted = decrypt(cipher, &key, Some(&iv), data)?;
    Ok(decrypted)
}

pub fn generate_keypair(key_file: &Option<String>) -> Result<()> {
    let path = match key_file {
        Some(s) => PathBuf::from(s),
        None => PathBuf::from("./dabihRootKey.pem"),
    };

    if path.exists() {
        bail!(
            "File {} already exists. Refusing to overwrite.",
            path.display()
        );
    }
    let mut file = File::create(&path)?;

    let bits = 4096;
    let key = Rsa::generate(bits)?;

    let pem = key.private_key_to_pem()?;
    file.write_all(&pem)?;

    let encoder = general_purpose::URL_SAFE_NO_PAD;

    let n = encoder.encode(key.n().to_vec());
    let e = encoder.encode(key.e().to_vec());

    let jwk = Jwk {
        kty: "RSA".to_string(),
        n,
        e,
    };
    let root_keys = RootKeys {
        root_keys: vec![jwk],
    };

    let yaml = serde_yaml::to_string(&root_keys)?;
    println!(
        "Successfully generated a new root key for dabih. Add it to your config like this: \n"
    );
    println!("{}\n", yaml);
    println!("Keep the file {} in a safe place!", path.display());

    Ok(())
}
