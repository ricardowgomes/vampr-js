class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampire = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampire++;
    }

    return numberOfVampire;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;

    } else {
      return false;
    }
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    for (const vampire of this.offspring) {
      if (this.name === name) {
        return this;
      }

      if (name === vampire.name) {
        return vampire;

      }
      const newValue = vampire.vampireWithName(name);

      if (newValue) {
        return newValue;
      }

    } return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;

    for (const descendent of this.offspring) {
      descendents++;
      descendents += descendent.totalDescendents;
    }
    return descendents;
  }


  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vampires = [];

    if (this.yearConverted > 1980) {
      vampires.push(this);
    }

    for (const vampire of this.offspring) {
      const vampiresThatAreMillennials = vampire.allMillennialVampires;
      vampires = vampires.concat(vampiresThatAreMillennials);
    }

    return vampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;

    } else if (this.numberOfVampiresFromOriginal >= vampire.numberOfVampiresFromOriginal) {
      return (vampire.creator ? vampire.creator : vampire);

    } else if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return (this.creator ? this.creator : this);

      // } else {
      //   return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal ? this : vampire);
    }
  }


}

module.exports = Vampire;

