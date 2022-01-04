drop database if exists node_todo_simples;
create database node_todo_simples;
use node_todo_simples;

create table todos(
    id bigint primary key auto_increment,
    title varchar(50) not null,
    done boolean not null default false
);

