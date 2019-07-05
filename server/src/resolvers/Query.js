const Query = {
  test:(parent, args, context) => {
    return context.prisma.test({id: args.id})
  },
  tests:(parent, args, context) => {
    return context.prisma.tests()
  },

}

module.exports = {
  Query,
}
