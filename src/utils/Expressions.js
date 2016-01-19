
export function getValueFor(model, str) {
  if(!model)
    return undefined

  const rname = /^([a-zA-Z0-9]+?)$/
  const rprop = /^([a-zA-Z0-9]+?)\.([a-zA-Z0-9]+?)$/
  const rpropArr = /^([a-zA-Z0-9]+?)\.([a-zA-Z0-9]+?)\[([0-9]*?)\]$/
  const rarrName  = /^([a-zA-Z0-9]+?)\[([0-9]*?)\]$/
  const rarrProp  = /^([a-zA-Z0-9]+?)\[([0-9]*?)\]\.([a-zA-Z0-9]+?)$/

  let result = undefined

  let match = rname.exec(str)
  if (match != null) {
    result = model[match[1]]
    return result
  }

  match = rprop.exec(str)
  if (match != null) {
    result = model[match[1]][match[2]]
    return result
  }

  match = rpropArr.exec(str)
  if (match != null) {
    result = model[match[1]][match[2]][match[3]]
    return result
  }

  match = rarrName.exec(str)
  if (match != null) {
    result = model[match[1]][match[2]]
    return result
  }

  match = rarrProp.exec(str)
  if (match != null) {
    result = model[match[1]][match[2]][match[3]]
    return result
  }

  throw Error('Parse error')
}

export function setValueFor(model, str, value) {
  if(!model)
    return undefined

  const rname = /^([a-zA-Z0-9]+?)$/
  const rprop = /^([a-zA-Z0-9]+?)\.([a-zA-Z0-9]+?)$/
  const rpropArr = /^([a-zA-Z0-9]+?)\.([a-zA-Z0-9]+?)\[([0-9]*?)\]$/
  const rarrName  = /^([a-zA-Z0-9]+?)\[([0-9]*?)\]$/
  const rarrProp  = /^([a-zA-Z0-9]+?)\[([0-9]*?)\]\.([a-zA-Z0-9]+?)$/

  let match = rname.exec(str)
  if (match != null) {
    model[match[1]] = value
    return
  }

  match = rprop.exec(str)
  if (match != null) {
    model[match[1]][match[2]] = value
    return
  }

  match = rpropArr.exec(str)
  if (match != null) {
    model[match[1]][match[2]][match[3]] = value
    return
  }

  match = rarrName.exec(str)
  if (match != null) {
    model[match[1]][match[2]] = value
    return
  }

  match = rarrProp.exec(str)
  if (match != null) {
    model[match[1]][match[2]][match[3]] = value
    return
  }

  throw Error('Parse error')
}

export function evalExpr(env, expr, base = '') {
  if (expr.indexOf('{')===-1)
    return expr

  let res = undefined
  let envs = getEnv(expr)


  for(const i in envs) {
    const name = envs[i]
    const key = `{${name}}`
    const fullname = base + name
    const value = getValueFor(env, fullname)

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

  setValueFor(env, varname, value)
  return env
}

export function getSchemaFor(model, str) {
  if(!model)
    return undefined

  const rname = /^([a-zA-Z0-9]+?)$/
  const rprop = /^([a-zA-Z0-9]+?)\.([a-zA-Z0-9]+?)$/
  const rpropArr = /^([a-zA-Z0-9]+?)\.([a-zA-Z0-9]+?)\[([0-9]*?)\]$/
  const rarrName  = /^([a-zA-Z0-9]+?)\[([0-9]*?)\]$/
  const rarrProp  = /^([a-zA-Z0-9]+?)\[([0-9]*?)\]\.([a-zA-Z0-9]+?)$/

  let result = undefined

  let match = rname.exec(str)
  if (match != null) {
    result = model[match[1]]
    return result
  }

  match = rprop.exec(str)
  if (match != null) {
    result = model[match[1]][match[2]]
    return result
  }

  match = rpropArr.exec(str)
  if (match != null) {
    result = model[match[1]][match[2]]['items']
    return result
  }

  match = rarrName.exec(str)
  if (match != null) {
    result = model[match[1]]['items']
    return result
  }

  match = rarrProp.exec(str)
  if (match != null) {
    result = model[match[1]]['items'][match[3]]
    return result
  }

  throw Error('Parse error')
}
