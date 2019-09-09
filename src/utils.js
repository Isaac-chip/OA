
  const keyName = 'wpb-';
  export default {
    clearStore : (params = {}) => {
      let { type } = params;
      if (type) {
        window.sessionStorage.clear();
      } else {
        window.localStorage.clear()
      }
    },
    getAllStore: (params = {}) => {
      let list = [];
      let {
        type
      } = params;
      if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
          list.push({
            name: window.sessionStorage.key(i),
            content: getStore({
              name: window.sessionStorage.key(i),
              type: 'session'
            })
          })
        }
      } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
          list.push({
            name: window.localStorage.key(i),
            content: getStore({
              name: window.localStorage.key(i),
            })
          })
    
        }
      }
      return list;
    },
    removeStore : (params = {}) => {
      let {
        name,
        type
      } = params;
      name = keyName + name
      if (type) {
        window.sessionStorage.removeItem(name);
      } else {
        window.localStorage.removeItem(name);
      }
    
    },
    getStore : (params = {}) => {
      let {
        name,
        debug
      } = params;
      name = keyName + name
      let obj = {},
        content;
      obj = window.sessionStorage.getItem(name);
      if (obj == null || obj == '') {
          obj = window.localStorage.getItem(name);
      }
      if (obj == null || obj == '') {
          return;
      }
      try {
        obj = JSON.parse(obj);
      } catch(e){
        return obj;
      }
      if (debug) {
        return obj;
      }
      if (obj.dataType == 'string') {
        content = obj.content;
      } else if (obj.dataType == 'number') {
        content = Number(obj.content);
      } else if (obj.dataType == 'boolean') {
        content = eval(obj.content);
      } else if (obj.dataType == 'object') {
        content = obj.content;
      }
      return content;
    },
    setStore :  (params = {}) => {
      let {
        name,
        content,
        type,
      } = params;
      name = keyName + name
      let obj = {
        dataType: typeof (content),
        content: content,
        type: type,
        datetime: new Date().getTime()
      }
      if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
      else window.localStorage.setItem(name, JSON.stringify(obj));
    }
  };