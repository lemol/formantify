
export function getValueFor(model, str) {
  if(!model)
    return undefined

  const splDot = str.split('.')
  if(splDot.length>1) {
    return model[splDot[0]][splDot[1]]
  }

  const spl = str.split('[')
  if (spl.length==1) {
    return model[str]
  }
  else {
    const ix = spl[1].split(']')[0]
    return model[spl[0]][ix]
  }
}

export function evalExpr(env, expr) {
  if (expr.indexOf('{')===-1)
    return expr

  let res = undefined
  let envs = getEnv(expr)


  for(const i in envs) {
    const name = envs[i]
    const key = `{${name}}`
    const value = getValueFor(env, name)


    if (value===undefined || value=='') {
      return undefined
    }

    res = res || expr
    res = res.replace(key, value.toString())
  }

  return res
}

export function getEnv(url) {
  const result = []
  const rgx = /\{(.*?)\}/g

  let match = rgx.exec(url)
  while (match != null) {
    result.push(match[1])
    match = rgx.exec(url)
  }

  return result
}

export function updateEnv(env, varname, value) {
  if(!env)
    return undefined

  const splDot = varname.split('.')
  if(splDot.length>1) {
    env[splDot[0]][splDot[1]] = value
    return env
  }

  const spl = varname.split('[')
  if (spl.length==1) {
    env[varname] = value
    return env
  }
  else {
    const ix = spl[1].split(']')[0]
    env[spl[0]][ix] = value
    return env
  }
}
