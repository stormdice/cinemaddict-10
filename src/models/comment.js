export default class Comment {
  constructor(data) {
    this.id = data.id || null;
    this.author = data.author || null;
    this.text = data.comment;
    this.date = data.date;
    this.emotion = data.emotion;
  }

  toRAW() {
    return {
      'comment': this.text,
      'date': this.date,
      'emotion': this.emotion
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
