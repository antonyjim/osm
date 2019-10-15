function Frank(props) {
  return <div></div>
}

declare var ApiResource
declare var OSM

export default function test_webpack() {
  var f_req = new ApiResource({
    table: 'sys_user',
    conditions: {
      user: OSM.session.user
    }
  })
  return <Frank />
}
