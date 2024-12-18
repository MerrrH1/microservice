const BlogPost = require("../models/post.model.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Konten tidak boleh kosong!"
        });
    }

    const tutorial = new BlogPost({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    BlogPost.create(tutorial, (err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat membuat post di database"
            });
        }
        else {
            res.send(data);
        };
    });
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    BlogPost.getAll(title, (err, data) => {
        if(err) {
            res.status(500).send({
                message: "Beberapa kesalahan terjadi saat mengambil data post"
            });
        }
        else {
            res.send(data);
        };
    });
}

exports.findOne = (req, res) => {
    BlogPost.findById(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Data tidak ditemukan di tabel post berdasarkan ID ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving post berdasarkan ID " + req.params.id
                });
            }
        }
        else {
            res.send(data);
        }
    });
}

exports.findAllPublished = (req, res) => {
    BlogPost.getAllPublished((err, data) => {
        if(err) {
            res.status(500).send({
                message: err.message || "Beberapa kesalahan terjadi saat mengambil data post."
            });
        }
        else {
            res.send(data);
        }
    });
}

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Tidak boleh kosong!"
        });
    }
    console.log(req.body);
    BlogPost.updateById(
        req.params.id,
        new BlogPost(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found post dengan id ${req.params.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating post dengan id " + req.params.id
                    });
                }
            }
            else {
                res.send(data);
            }
        }
    );
};

exports.delete = (req, res) => {
    BlogPost.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else {
            res.send({ message: `Tutorial was deleted successfully!` });
        }
    });
};

exports.deleteAll = (req, res) => {
    BlogPost.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        } else {
            res.send({ message: "All tutorials were deleted successfully!" });
        }
    });
};