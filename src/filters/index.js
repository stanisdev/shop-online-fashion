'use strict';

class Filters {
  constructor({ db }) {
    this.db = db;
  }

  findType(idSource) {
    return async function(req) {
      const id = idSource == 'byParam' ? req.params.id : req.query.typeId;
      const type = await this.db.Type.findOne({
        where: {
          id,
          enabled: true
        },
        attributes: ['id', 'name', 'alias']
      });
      if (!(type instanceof Object)) {
        throw new Error('Requested type of clothes not found'); // @todo: throw 400 error
      }
      req.type = {
        id: type.id,
        name: typeof type.alias === 'string' ? type.alias : type.name
      };
    };
  }
}

module.exports = Filters;