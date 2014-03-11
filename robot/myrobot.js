// Generated by LiveScript 1.2.0
(function(){
  var Boss3, tr;
  importScripts('../base-robot.js');
  Boss3 = (function(superclass){
    var idleCount, prototype = extend$((import$(Boss3, superclass).displayName = 'Boss3', Boss3), superclass).prototype, constructor = Boss3;
    idleCount = 0;
    prototype.doSearch = function(){
      this.turn_turret_right(45);
      this.turn_right(15);
      this.move_forwards(25);
      this.shoot();
      this.shoot();
      this.shoot();
      this.shoot();
      this.shoot();
      this.shoot();
    };
    prototype.onIdle = function(){
      var myAngle, forward, tinyMove, tinyShoot, leftDist, rightDist;
      this.idleCount++;
      myAngle = this.me.angle % 360;
      if (this.myVarEnemy) {
        forward = false;
        tinyMove = Math.random() * 45;
        tinyShoot = Math.random() * 10;
        leftDist = myAngle + 360 - this.myVarEnemy[0].angle;
        this.shoot();
        if (leftDist > 360) {
          leftDist = leftDist - 360;
          this.shoot();
        }
        rightDist = this.myVarEnemy[0].angle - myAngle;
        if (rightDist < 0) {
          rightDist = 360 + rightDist;
          this.shoot();
        }
        if (leftDist !== rightDist) {
          if (Math.random() > 0.5) {
            forward = true;
            this.shoot();
          }
          if (leftDist > rightDist) {
            this.turn_turret_right(rightDist + 5 + tinyShoot);
            this.shoot();
          } else {
            this.turn_turret_left(leftDist + 5 + tinyShoot);
            this.shoot();
          }
          if (forward) {
            this.move_forwards(tinyMove);
            this.shoot();
          } else {
            this.move_backwards(tinyMove);
            this.shoot();
          }
          this.shoot();
        } else {
          this.shoot();
        }
        this.myVarEnemy = undefined;
      } else {
        if (this.idleCount > 3) {
          this.doSearch();
          this.shoot();
          if (this.idleCount > 4) {
            this.doSearch();
            this.shoot();
            if (this.idleCount > 5) {
              this.doSearch();
              this.shoot();
            }
          }
          return;
        }
        this.turn_turret_left(30);
        this.turn_left(30);
        this.move_forwards(Math.random() * 50 + 10);
        this.shoot();
      }
    };
    prototype.onWallCollide = function(){
      this.move_opposide(10);
      this.turn_left(90);
      this.idleCount = 0;
      this.shoot();
    };
    prototype.onHit = function(){
      this.idleCount = 0;
      this.yell("No! I'm hit!");
      this.shoot();
    };
    prototype.onEnemySpot = function(){
      this.myVarEnemy = this.enemySpot;
      this.shoot();
      this.yell("Enemy spotted!");
      this.idleCount = 0;
    };
    function Boss3(){
      Boss3.superclass.apply(this, arguments);
    }
    return Boss3;
  }(BaseRobot));
  tr = new Boss3("The final boss");
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
