export default class Comment {
  constructor(comment) {
    this.id = comment.id || null;
    this.author = comment.author || null;
    this.text = comment.comment;
    this.date = comment.date;
    this.emotion = comment.emotion;
  }

  toRAW() {
    return {
      'comment': this.text,
      'date': this.date,
      'emotion': this.emotion
    };
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comment) {
    return comment.map(Comment.parseComment);
  }
}
