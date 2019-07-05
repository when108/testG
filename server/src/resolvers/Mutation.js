const Mutation = {
  
  createTest: async (parent, { location, name, currency }, context) => {
    return await context.prisma.createTest({
      name,
      location,
      currency
    })
  },
  updateTest: async (parent, {id, location, name, currency }, context) => {
    const test = await context.prisma.updateTest({
      data: {
        name,
        location,
        currency
      },
        where:{ id } 
      })
    return test
  },
  delete: async (parent, { id }, context) => {
    return await context.prisma.deleteTest({ id })
  }
}

module.exports = {
  Mutation
}
