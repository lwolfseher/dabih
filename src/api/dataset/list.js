import { dataset } from '../../database/index.js';
import { getSub } from '../../util/index.js';

const route = async (ctx) => {
  const sub = getSub(ctx);

  const { deleted, all, query } = ctx.query;

  const params = {
    deleted: deleted !== 'false',
    all: all !== 'false',
    query,
  };

  const datasets = await dataset.listAccessible(ctx, sub, params);
  ctx.body = datasets;
};
export default route;
