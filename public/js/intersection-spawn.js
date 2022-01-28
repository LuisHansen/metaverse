/**
 * Spawn entity at the intersection point on click, given the properties passed.
 *
 * `<a-entity intersection-spawn="mixin: box; material.color: red">` will spawn
 * `<a-entity mixin="box" material="color: red">` at intersection point.
 */
/* global AFRAME, THREE */
AFRAME.registerComponent('intersection-spawn', {
  schema: {
    default: '',
    parse: AFRAME.utils.styleParser.parse
  },

  init: function () {
    
    const data = this.data;
    const el = this.el;
    
    el.addEventListener(data.event, evt => {
      if (evt.detail.intersection.distance > 5) { return;}
      console.log(evt);
      // Create element.a
      const spawnEl = document.createElement('a-entity');
      
      let normal = evt.detail.intersection.face.normal;
      console.log(normal);
      // Snap intersection point to grid and offset from center.
      spawnEl.setAttribute('position', evt.detail.intersection.point);
      spawnEl.setAttribute('rotation', `${normal.y*90} ${normal.x*90} 0`)
      
      // Set components and properties.
      Object.keys(data).forEach(name => {
        if (name === 'event') { return; }
        AFRAME.utils.entity.setComponentProperty(spawnEl, name, data[name]);
      });

      // Append to scene.
      el.sceneEl.appendChild(spawnEl);
    });
  }
});