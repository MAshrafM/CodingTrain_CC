function DNA(genes){
  // create dna if genes recieved
  // else create random dna
  if(genes){
    this.genes = genes;
  } else {
    this.genes = [];
    for(let i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxForce);
    }
  }
  
  // crossover with another
  this.crossover = (partner) => {
    let newgenes = [];
    // pick random midpoint
    let mid = floor(random(this.genes.length));
    // if i > mid point take it from current parent genes
    // else take it from the partner genes
    for(let i = 0; i < this.genes.length; i++){
      if(i > mid){
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }
  
  // add mutation
  this.mutation = () => {
    for(let i = 0; i < this.genes.length; i++){
      if(random(1) < 0.01){
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxForce);
      }
    }
  }
}