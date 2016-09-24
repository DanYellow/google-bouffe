export default class Utils {
  /**
   * Slugify a string
   * @source https://gist.github.com/mathewbyrne/1280286
   * @param  {String} text string to slugify
   * @return {String}      A slugified string
   */
  static slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
}