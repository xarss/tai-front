class Answer {
  static currentId = 0;

  static newId() {
    return ++Answer.currentId;
  }

  constructor(question, text, places, success) {
    this.id = Answer.newId();
    this.question = question;
    this.text = text ? text : "...";
    this.places = places ? places : [];
    this.topAmount = 3;
    this.success = success;
  }

  topPlaces(amount = this.topAmount) {
    return this.places.length > 0
      ? this.places.slice(0, Math.min(amount, this.places.length - 1))
      : [];
  }
}

export default Answer;
