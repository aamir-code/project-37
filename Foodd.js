class Foodd{
    constructor() {
    
        this.foodStock = 20;
        this.lastFed = 21;
        this.image = loadImage("Milk.png")
    }
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    getFoodStock() {
        
    return this.foodStock;

    }
    bedroom() {
        background(bedroom,550,500);
    }
    garden() {
        background(garden,550,500);
    }
    bathroom() {
        background(bathroom,550,500);
    }
    
    display() {
        var x = 80,y = 60;

        if(this.foodStock != null) {
            for(var i = 0;i < this.foodStock;i++) {

                if(i%10 == 0){

                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50)
                x = x+30;

            }

        }
    }
}