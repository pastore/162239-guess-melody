window.animation = {
  getAnimation: (step, stepDuration, steps) => ({
    step, stepDuration, steps
  }),

  animate: (animation, callback, callbackEnd) => {
      //debugger;
      const interval = setInterval(() => {
          //debugger;
      const nextStep = animation.step + 1;
      if (nextStep <= animation.steps) {
        animation = window.animation.getAnimation(nextStep, animation.stepDuration, animation.steps);
        callback(animation);
      } else {
        stopFn();
        if (typeof callbackEnd === `function`) {
          callbackEnd();
        }
      }
    }, animation.stepDuration);

    const stopFn = () => clearInterval(interval);

    return stopFn;
  }
};
