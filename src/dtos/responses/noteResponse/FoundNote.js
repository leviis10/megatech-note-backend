class FoundNoteBuilder {
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
        return new FoundNote(this.id, this.title, this.content, this.createdAt, this.updatedAt);
    }
}

class FoundNote {
    constructor(id, title, content, createdAt, updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static builder() {
        return new FoundNoteBuilder();
    }

    static fromEntity(note) {
        return FoundNote.builder()
            .id(note.id)
            .title(note.title)
            .content(note.content)
            .createdAt(note.createdAt)
            .updatedAt(note.updatedAt)
            .build();
    }
}

module.exports = FoundNote;