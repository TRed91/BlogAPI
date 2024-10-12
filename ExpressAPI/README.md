ROUTES:

/users... /authors...
get all: /          => GET
get one: /:userId   => GET
create:  /          => POST
update:  /:userId   => PUT
delete:  /:userId   => DELETE

(Comments)
create:  /users/:userId/comments/:articleId => POST
get one: /users/comments/:commentId         => GET
update:  /users/comments/:commentId         => PUT
delete:  /users/comments/:commentId         => DELETE

(Articles)
create  /:userId/articles => POST
update  /:userId/articles/:articleId => PUT
publish /:userId/publish/:articleId  => PUT
get one /:userId/articles/:articleId => GET
get all /:userId/articles/           => GET
delete  /:userId/articles/:articleId => DELETE