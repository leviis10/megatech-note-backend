class FoundTodoBuilder {
    id(id) {
        this.id = id;
        return this;
    }

    title(title) {
        this.title = title;
        return this;
    }

    content(content) {
        this.content = content;
        return this;
    }

    createdAt(createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    updatedAt(updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    build() {
        return new FoundTodo(this.id, this.title, this.content, this.createdAt, this.updatedAt);
    }
}

class FoundTodo {
    constructor(id, title, content, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static builder() {
        return new FoundTodoBuilder();
    }

    static fromEntity(todo) {
        return FoundTodo.builder()
            .id(todo.id)
            .title(todo.title)
            .content(todo.content)
            .createdAt(todo.createdAt)
            .updatedAt(todo.updatedAt)
            .build();
    }
}

module.exports = FoundTodo;