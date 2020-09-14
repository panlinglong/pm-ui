import {getRequest} from './api'


export const initMenu=(router,store)=>{
  if (store.state.routes.length>0){
    return
  }
  getRequest("/system/config/menu").then(data=>{
    if (data){
      let fmtRoutes = formatRoutes(data);
      router.addRoutes(fmtRoutes);
      store.commit('initRoutes',fmtRoutes);
    }
  })
}

export const formatRoutes=(routes)=>{
  let fmRoutes=[];
  routes.forEach(router=>{
    let {
      path,
      component,
      name,
      meta,
      iconcls,
      children
    }=router;
    if (children && children instanceof Array){
      children=formatRoutes(children);
    }
    let fmRouter = {
      path:path,
      name:name,
      iconcls:iconcls,
      meta:meta,
      children:children,
      component(solve){
        //相当于动态导入组件
        if (component.startsWith("Home")){
          require(['../views/'+component+'.vue'],solve)
        }else if (component.startsWith("Emp")){
          require(['../views/emp/'+component+'.vue'],solve)
        }else if (component.startsWith("Sys")){
          require(['../views/sys/'+component+'.vue'],solve)
        }else if (component.startsWith("New")){
          require(['../views/new/'+component+'.vue'],solve)
        }else if (component.startsWith("Kehu")){
          require(['../views/kehu/'+component+'.vue'],solve)
        }else if (component.startsWith("Deal")){
          require(['../views/deal/'+component+'.vue'],solve)
        }
      }
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes;
}
