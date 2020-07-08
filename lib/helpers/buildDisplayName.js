module.exports = ({ first_name, last_name, username }) => {
  return first_name || last_name ? [first_name, last_name].join(' ') : username
}
