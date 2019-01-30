exports.up = function(knex, Promise) {
	return knex.schema.createTable("users", tbl => {
		tbl.increments();
		tbl.string("username", 128)
			.unique()
			.notNullable();
		tbl.string("password", 128).notNullable();
		tbl.string("departments", 128).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("users");
};
