const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate apis',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'apis name please',
    validate: notEmpty('name')
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: 'get',
      value: 'get',
      checked: true
    },
    {
      name: 'post',
      value: 'post',
      checked: true
    },
    {
      name: 'put',
      value: 'put',
      checked: true
    },
    {
      name: 'delete',
      value: 'delete',
      checked: true
    }
    ],
    validate(value) {
      if (!value.includes('get')) {
        return 'apis require at least get'
      }
      return true
    }
  }
  ],
  actions(data) {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/api/${name}.js`,
      templateFile: 'plop-templates/apis/index.hbs',
      data: {
        name: name,
        get: data.blocks.includes('get'),
        post: data.blocks.includes('post'),
        put: data.blocks.includes('put'),
        delete: data.blocks.includes('delete')
      }
    }]

    return actions
  }
}
