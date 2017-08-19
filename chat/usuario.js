'use strict';

module.exports = class Usuario {
    constructor(connection, nickname) {
        this.connection = connection;
        this.nickname = nickname;
        this.qtdMsg = 0;
    }

    set nickname (nickname = 'Anonymus') { this._nickname = nickname }
    get nickname () { return this._nickname }
    set connection (connection = '') { this._connection = connection }
    get connection () { return this._connection }
}