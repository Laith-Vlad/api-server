'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async read(id) {
    if (id) {
      return await this.model.findByPk(id);
    } else {
      return await this.model.findAll();
    }
  }

  async update(id, data) {
    const item = await this.model.findByPk(id);
    if (!item) {
      throw new Error('Item not found.');
    }
    return await item.update(data);
  }

  async delete(id) {
    const item = await this.model.findByPk(id);
    if (!item) {
      throw new Error('Item not found.');
    }
    await item.destroy();
  }
}

module.exports = Collection;