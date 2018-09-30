function Population(){
  this.rockets = []; // rockets arr
  this.popSize = 35; // amount of rockets
  this.matingPool = []; // parent rocket partners
  
  for(let i = 0; i < this.popSize; i++){
    this.rockets[i] = new Rocket();
  }
  
  this.evaluate = () => {
    let maxFit = 0;
    // calc fitness
    for(let i = 0; i < this.popSize; i++){
      this.rockets[i].calcFitness();
      // set maxFit to greater max
      if(this.rockets[i].fitness > maxFit){
        maxFit = this.rockets[i].fitness;
      }
    }
    // normalize
    for(let i = 0; i < this.popSize; i++){
      this.rockets[i].fitness /= maxFit;
    }
    
    this.matingPool = []; // reset mating pool
    // scale fitness
    // add to the mating pool
    for(let i = 0; i < this.popSize; i++){
      let n = this.rockets[i].fitness * 100;
      for(let j = 0; j < n; j++){
        this.matingPool.push(this.rockets[i]);
      }
    }
  }
  
  // select genes
  this.selection = () => {
    let newRockets = [];
    for(let i = 0; i < this.rockets.length; i++){
      // pick random parents
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;
      // create child 
      let child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }
  
  // call update and show
  this.run = () => {
    for(let i = 0; i < this.popSize; i++){
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}