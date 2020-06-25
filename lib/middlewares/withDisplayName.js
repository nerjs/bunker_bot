module.exports = (ctx, next) => {
  const {
    from: { first_name, last_name, username },
  } = ctx

  ctx.from.displayName = first_name || last_name ? [first_name, last_name].join(' ') : username
  return next(ctx)
}
