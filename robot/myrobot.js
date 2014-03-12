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
    };
    prototype.onIdle = function(){
      var myAngle, forward, tinyMove, tinyShoot, leftDist, rightDist;
      this.idleCount++;
      myAngle = this.me.angle % 360;
      if (this.myVarEnemy) {
        forward = false;
        tinyMove = Math.random() * 15;
        tinyShoot = Math.random() * 10;
        leftDist = myAngle + 360 - this.myVarEnemy[0].angle;
        if (leftDist > 360) {
          leftDist = leftDist - 360;
        }
        rightDist = this.myVarEnemy[0].angle - myAngle;
        if (rightDist < 0) {
          rightDist = 360 + rightDist;
        }
        if (leftDist !== rightDist) {
          if (Math.random() > 0.5) {
            forward = true;
          }
          if (leftDist > rightDist) {
            this.turn_turret_right(rightDist + 0 + tinyShoot);
          } else {
            this.turn_turret_left(leftDist + 0 + tinyShoot);
          }
          if (forward) {
            this.move_forwards(tinyMove % 10);
          } else {
            this.move_backwards(tinyMove % 10);
          }
          this.shoot();
        } else {
          this.shoot();
        }
        this.myVarEnemy = undefined;
      } else {
        if (this.idleCount > 3) {
          this.doSearch();
          if (this.idleCount > 4) {
            this.doSearch();
            if (this.idleCount > 5) {
              this.doSearch();
            }
          }
          return;
        }
        this.turn_turret_left(45);
        this.turn_left(30);
        this.move_forwards(Math.random() * 50 + 10);
      }
    };
    prototype.onWallCollide = function(){
      this.move_opposide(10);
      this.turn_left(90);
      this.idleCount = 0;
    };
    prototype.onHit = function(){
      this.idleCount = 0;
      this.yell("No! I'm hit!");
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
