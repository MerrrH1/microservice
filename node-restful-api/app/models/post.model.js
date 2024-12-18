const pool = require("./db.js");

const BlogPost = function(blogpost) {
    this.title = blogpost.title;
    this.description = blogpost.description;
    this.published = blogpost.published;
};

BlogPost.create = (newBlogPost, result) => {
    pool.query("INSERT INTO tbl_post SET ?", newBlogPost, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Blog post: ", { id: res.insertId, ...newBlogPost });
        result(null, { id: res.insertId, ...newBlogPost });
    });
};

BlogPost.findById = (id, result) => {
    pool.query(`SELECT * FROM tbl_post WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length) {
            console.log("found Blog Posts: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

BlogPost.getAll = (title, result) => {
    let query = "SELECT * FROM tbl_post";

    if(title) {
        query += `WHERE title LIKE '%${title}%'`;
    }
    pool.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Blog Posts: ", res);
        result(null, res);
    });
};

BlogPost.getAllPublished = result => {
    pool.query("SELECT * FROM tbl_post WHERE published=true", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Blog Posts: ", err);
        result(null, res);
    });
};

BlogPost.updateById = (id, blogpost, result) => {
    pool.query("UPDATE tbl_post SET title = ?, description = ?, published = ? WHERE id = ?",
        [blogpost.title, blogpost.description, blogpost.published, id],
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Updated blogpost: ", { id: id, ...blogpost });
            result(null, { id: id, ...blogpost });
        }
    );
};

BlogPost.remove = (id, result) => {
    pool.query("DELETE FROM tbl_post WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted blogpost with id: ", id);
        result(null, res);
    });
};

BlogPost.removeAll = result => {
    pool.query("DELETE FROM tbl_post", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`Deleted ${res.affectedRows} blogposts`);
        result(null, res);
    });
};

module.exports = BlogPost;