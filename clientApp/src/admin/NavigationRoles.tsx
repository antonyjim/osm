import * as React from 'react'
import { Component, useState } from 'react'
import { Alert } from '../common/Alerts'
import Pills from '../common/PillLayout'
// import * as $ from 'jquery'
import { SelectField, Field } from '../common/FormControls'
import { ITHQWindowNamespace } from '../typings'

declare global {
  interface Window {
    MonacoEnvironment: any
    THQ: ITHQWindowNamespace
  }
}

// function ExistingRoute(props) {
//   function setNav() {
//     document.getElementById('updateButton').style.display = 'inline-block'
//     document.getElementById('submitButton').style.display = 'none'
//     $('#existinglinks').modal('toggle')
//   }

//   return (
//     <tr>
//       <th scope='col'>
//         <a
//           href='#'
//           onClick={(e) => {
//             props.onChoice(e, props)
//             setNav()
//           }}
//         >
//           {this.props.navInnerText}
//         </a>
//       </th>
//       <th scope='col'>{props.navMethod}</th>
//       <th scope='col'>{props.navHref}</th>
//       <th scope='col'>{props.navPriv}</th>
//       <th scope='col'>{props.navMenu}</th>
//       <th scope='col'>{props.navHeader}</th>
//       <th scope='col'>{props.navActive}</th>
//       <th scope='col'>{props.navIsNotApi}</th>
//     </tr>
//   )
// }

// class ExistingRoutes extends Component<any, any> {
//   constructor(props) {
//     super(props)
//     this.state = {
//       links: [null],
//       unAuthorized: false
//     }
//     this.getLinks()
//   }

//   private getLinks() {
//     $.ajax('/api/admin/getAllRoutes?token=' + window.THQ.token, {
//       method: 'GET',
//       success: (links) => {
//         if (links.error) {
//           console.error(links.message)
//         } else {
//           this.setState({ links })
//         }
//       },
//       error: (err) => {
//         throw err
//       }
//     })
//   }

//   public render() {
//     return (
//       <div
//         id='existinglinks'
//         className='modal fade'
//         tabIndex={-1}
//         role='dialog'
//       >
//         <div className='modal-dialog modal-xl' role='document'>
//           <div className='modal-content'>
//             <div className='modal-header'>
//               <h5 className='modal-title'>Navigation</h5>
//               <button
//                 type='button'
//                 className='close'
//                 data-dismiss='modal'
//                 aria-label='Close'
//               >
//                 <span aria-hidden='true'>&times;</span>
//               </button>
//             </div>
//             <div className='modal-body'>
//               <table className='table'>
//                 <thead className='thead-dark'>
//                   <tr>
//                     <th scope='col'>Inner Text</th>
//                     <th scope='col'>Method</th>
//                     <th scope='col'>Href</th>
//                     <th scope='col'>Privilege</th>
//                     <th scope='col'>Menu</th>
//                     <th scope='col'>Heading</th>
//                     <th scope='col'>Active</th>
//                     <th scope='col'>UI</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.state.links.map((link, i) => {
//                     return (
//                       <ExistingRoute
//                         onChoice={this.props.onChoice}
//                         key={i}
//                         {...link}
//                       />
//                     )
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// class Routes extends Component<any, any> {
//   constructor(props) {
//     super(props)
//     this.getRoles()
//     this.state = {
//       hideNav: true,
//       roles: [
//         {
//           value: '',
//           text: '-- None --'
//         }
//       ],
//       message: null,
//       link: {
//         navActive: '',
//         navIsNotApi: '',
//         navMethod: '',
//         navHref: '',
//         navHeader: '',
//         navMenu: '',
//         navPriv: '',
//         navInnerText: '',
//         sys_id: ''
//       }
//     }
//   }

//   private getRoles() {
//     $.ajax('/api/admin/getPrivs?token=' + window.THQ.token, {
//       method: 'GET',
//       success: (roles) => {
//         if (roles.error) {
//           console.error(roles.message)
//           this.setState({ unAuthorized: true })
//         }
//         const roleOpts = []
//         roles.details.forEach((role) => {
//           roleOpts.push({
//             value: role.role_priv,
//             text: role.role_priv
//           })
//         })
//         this.setState({ roles: roleOpts })
//       },
//       error: (res: JQueryXHR, err: string) => {
//         throw err
//       }
//     })
//   }

//   private handleOnTypeChange(e) {
//     if (e.target.value === '1') {
//       this.setState({ hideNav: false })
//     } else {
//       this.setState({ hideNav: true })
//     }
//   }

//   private submitAdd() {
//     const fields = document
//       .getElementById('navLinkForm')
//       .querySelectorAll('input, select, textarea')
//     const body = {}
//     fields.forEach((field: HTMLInputElement) => {
//       const fieldName = field.getAttribute('name') || field.id
//       let fieldValue: any = field.value
//       if (fieldValue === '1') {
//         fieldValue = true
//       } else if (fieldValue === '0') {
//         fieldValue = false
//       }
//       body[fieldName] = fieldValue
//     })

//     submitForm({
//       body: [body],
//       action: '/api/admin/addRoute?token=' + window.THQ.token,
//       method: 'POST',
//       cb: (err, response) => {
//         if (err) {
//           console.error(err)
//         }
//         if (response.error) {
//           this.setState({
//             message: {
//               type: 'danger',
//               message: response.error
//             }
//           })
//         } else {
//           if (response.details.navLinksEntered.length === 1) {
//             this.setState({
//               message: {
//                 type: 'success',
//                 message: response.message
//               }
//             })
//           } else {
//             this.setState({
//               message: {
//                 type: 'danger',
//                 message: response.message
//               }
//             })
//           }
//         }
//       }
//     })
//   }

//   private submitUpdate() {
//     const fields = document
//       .getElementById('navLinkForm')
//       .querySelectorAll('input, select, textarea')
//     const body = {}
//     fields.forEach((field: HTMLInputElement) => {
//       const fieldName = field.getAttribute('name') || field.id
//       let fieldValue: any = field.value
//       if (fieldValue === '1') {
//         fieldValue = true
//       } else if (fieldValue === '0') {
//         fieldValue = false
//       }
//       body[fieldName] = fieldValue
//     })

//     submitForm({
//       body,
//       action: '/api/admin/updateRoute?token=' + window.THQ.token,
//       method: 'POST',
//       cb: (err, response) => {
//         if (err) {
//           alert(err)
//         }
//         if (response.error) {
//           this.setState({
//             message: {
//               type: 'danger',
//               message: response.error
//             }
//           })
//         } else {
//           if (response.details) {
//             this.setState({
//               message: {
//                 type: 'success',
//                 message: response.message
//               }
//             })
//           } else {
//             this.setState({
//               message: {
//                 type: 'danger',
//                 message: response.message
//               }
//             })
//           }
//         }
//       }
//     })
//   }

//   private handleChange(e) {
//     const value = e.target.value
//     const name = e.target.id
//     const link = { ...this.state.link } // Clone the existing link
//     link[name] = value // Insert the changed value
//     this.setState({ link }) // Set the state
//   }

//   private setLink(e, link) {
//     this.setState({ link })
//     if (link.navIsNotApi) {
//       this.setState({ hideNav: false })
//     } else {
//       this.setState({ hideNav: true })
//     }
//   }

//   public render() {
//     if (this.state.unAuthorized) {
//       return (
//         <div id='navLinkForm' className={this.props.className + ' m-3'}>
//           <E401 />
//         </div>
//       )
//     } else {
//       return (
//         <div id='navLinkForm' className={this.props.className + ' m-3'}>
//           <ExistingRoutes onChoice={this.setLink.bind(this)} />
//           {this.state.message && (
//             <Alert
//               message={this.state.message.message}
//               alertType={this.state.message.type}
//             />
//           )}
//           <input type='hidden' id='sys_id' value={this.state.link.sys_id} />
//           <Field
//             id='navInnerText'
//             name='navInnerText'
//             type='text'
//             label='Inner Text of <a> tag'
//             value={this.state.link.navInnerText}
//             onChange={this.handleChange.bind(this)}
//           />
//           <Field
//             id='navHref'
//             name='navHref'
//             type='text'
//             label='Full Path'
//             value={this.state.link.navHref}
//             onChange={this.handleChange.bind(this)}
//           />
//           <SelectField
//             id='navMethod'
//             name='navMethod'
//             label='Method'
//             value={this.state.link.navMethod}
//             onChange={this.handleChange.bind(this)}
//             opts={[
//               {
//                 value: 'GET',
//                 text: 'GET'
//               },
//               {
//                 value: 'POST',
//                 text: 'POST'
//               }
//             ]}
//           />
//           <SelectField
//             id='navIsNotApi'
//             label='Link Type'
//             value={this.state.link.navIsNotApi}
//             opts={[
//               {
//                 value: '0',
//                 text: 'API'
//               },
//               {
//                 value: '1',
//                 text: 'Navigation'
//               }
//             ]}
//             otherField={false}
//             onChange={(e) => {
//               this.handleOnTypeChange(e)
//               this.handleChange(e)
//             }}
//           />
//           <Field
//             isHidden={this.state.hideNav}
//             id='navMenu'
//             name='navMenu'
//             label='Root Menu'
//             type='text'
//             value={this.state.link.navMenu}
//             onChange={this.handleChange.bind(this)}
//           />
//           <Field
//             isHidden={this.state.hideNav}
//             id='navHeader'
//             name='navHeader'
//             label='SubHeading'
//             type='text'
//             value={this.state.link.navHeader}
//             onChange={this.handleChange.bind(this)}
//           />
//           <SelectField
//             id='navPriv'
//             label='Privilege'
//             opts={this.state.roles}
//             otherField={true}
//             value={this.state.link.navPriv}
//             onChange={this.handleChange.bind(this)}
//           />
//           <SelectField
//             id='navActive'
//             label='Active'
//             value={this.state.link.navActive}
//             onChange={this.handleChange.bind(this)}
//             opts={[
//               {
//                 value: '1',
//                 text: 'Active'
//               },
//               {
//                 value: '0',
//                 text: 'Inactive'
//               }
//             ]}
//           />
//           <button
//             id='updateButton'
//             className='btn btn-primary'
//             style={{ display: 'none' }}
//             onClick={() => {
//               this.submitUpdate()
//             }}
//           >
//             Update
//           </button>
//           <button
//             id='submitButton'
//             className='btn btn-primary'
//             onClick={() => {
//               this.submitAdd()
//             }}
//           >
//             Submit
//           </button>
//           <button
//             className='btn btn-secondary ml-2'
//             data-toggle='modal'
//             data-target='#existinglinks'
//           >
//             Existing
//           </button>
//         </div>
//       )
//     }
//   }
// }

// function PrivTable(props: any) {
//   const [privs, setPrivs] = useState(props.allPrivs)
//   const allPrivs = [
//     {
//       text: '-- None --',
//       value: ''
//     }
//   ]
//   if (props.allPrivs) {
//     props.allPrivs.map((priv: any) => {
//       allPrivs.push(priv.rpPriv)
//     })
//   }

//   const rows: JSX.Element[] = []
//   const unUsed = props.allPrivs.filter(
//     (privilege: any) => props.privs.indexOf(privilege) === -1
//   )
//   if (props.privs[0] !== null) {
//     props.privs.map((priv: any) => {
//       rows.push(
//         <tr key={Math.floor(Math.random() * 10000)}>
//           <td>{props.rpId}</td>
//           <td>{priv}</td>
//           <td>
//             <a
//               href='javascript:void(0)'
//               onClick={props.onDelete}
//               data-target={priv}
//             >
//               Delete
//             </a>
//           </td>
//         </tr>
//       )
//     })
//   }
//   return (
//     <table className='table'>
//       <thead className='thead-dark'>
//         <tr>
//           <th scope='col'>Role</th>
//           <th scope='col'>Priv</th>
//           <th scope='col'>Mod</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows}
//         <tr>
//           <td>{props.rpId}</td>
//           <td className='p-0'>
//             <SelectField
//               opts={unUsed}
//               id='newPriv'
//               onChange={props.onChange}
//               value={props.newPrivValue}
//             />
//           </td>
//           <td>
//             <a
//               href='javascript:void(0)'
//               onClick={props.onAdd}
//               data-for={props.rpId}
//             >
//               Add
//             </a>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }

// class Roles extends Component<any, any> {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       error: false,
//       status: null,
//       roles: [
//         {
//           text: '-- None --',
//           value: ''
//         }
//       ],
//       privs: [null],
//       allPrivs: [null],
//       rpId: '',
//       newPriv: ''
//     }
//     this.getRoles()
//     this.getPrivs(true)
//   }

//   private getRoles() {
//     $.ajax('/api/admin/getRoles?token=' + window.THQ.token, {
//       success: (response) => {
//         if (response.error) {
//           this.setState({
//             error: true,
//             status: response.message
//           })
//         } else {
//           const rolesFormatted = [
//             {
//               text: '-- None --',
//               value: 'none'
//             }
//           ]
//           response.details.map((role: any) => {
//             rolesFormatted.push({
//               value: role.rpId,
//               text: role.rpId
//             })
//           })
//           console.log(rolesFormatted)
//           this.setState({
//             error: false,
//             roles: rolesFormatted
//           })
//         }
//       }
//     })
//   }

//   private getPrivs(all: any, specificRole?: any) {
//     let url = ''
//     if (all) {
//       url = `/api/admin/getPrivs?token=${window.THQ.token}`
//     } else if (specificRole) {
//       url = `/api/admin/getPrivs?role=${specificRole}&token=${window.THQ.token}`
//     } else {
//       url = `/api/admin/getPrivs?role=${this.state.rpId}&token=${
//         window.THQ.token
//       }`
//     }
//     $.ajax(url, {
//       success: (response) => {
//         if (!response.error) {
//           const receivedPrivs: any[] = []
//           response.details.map((priv: any) => {
//             receivedPrivs.push(priv.rpPriv)
//           })
//           if (all) {
//             this.setState({
//               error: false,
//               allPrivs: receivedPrivs
//             })
//           } else {
//             this.setState({
//               error: false,
//               privs: receivedPrivs
//             })
//           }
//         } else {
//           this.setState({
//             error: true,
//             status: response.message
//           })
//         }
//       },
//       error: (err) => {
//         this.setState({
//           error: true,
//           status: err
//         })
//       }
//     })
//   }

//   private handleDelete(e: React.ChangeEvent) {
//     const rpPriv = e.target.getAttribute('data-target')
//     fetch(
//       `/api/admin/roles/remove?rpId=${this.state.rpId}&rpPriv=${rpPriv}&token=${
//         window.THQ.token
//       }`,
//       {
//         method: 'POST'
//       }
//     )
//       .then((res) => {
//         return res.json()
//       })
//       .then((response) => {
//         if (response.error) {
//           this.setState({ error: true, status: response.message })
//         } else {
//           const newPrivs = []
//           for (const priv of this.state.roles) {
//             if (priv.rpPriv === rpPriv) {
//               continue
//             } else {
//               newPrivs.push(priv)
//             }
//           }
//           this.setState({
//             error: false,
//             status: response.message,
//             privs: newPrivs
//           })
//         }
//       })
//       .catch((err) => {
//         this.setState({
//           error: true,
//           status: 'Could not remove link. Please try again later'
//         })
//       })
//   }

//   private handleAdd(e: React.MouseEvent) {
//     if (e.target instanceof HTMLElement) {
//       const rpId = e.target.getAttribute('data-for')
//       const rpPriv = this.state.newPriv
//       if (rpId && rpPriv) {
//         $.ajax(
//           `/api/admin/roles/add?rpId=${rpId}&rpPriv=${rpPriv}&token=${
//             window.THQ.token
//           }`,
//           {
//             method: 'POST',
//             success: (response) => {
//               if (response.error) {
//                 this.setState({
//                   error: true,
//                   status: response.message
//                 })
//               } else {
//                 const privs = this.state.privs
//                 privs.push(rpPriv)
//                 this.setState({
//                   error: false,
//                   status: response.message,
//                   privs
//                 })
//               }
//             }
//           }
//         )
//       } else {
//         this.setState({
//           error: true,
//           status: 'Missing role or priv'
//         })
//       }
//     }
//   }

//   private handleChange(e: React.ChangeEvent) {
//     if (e.target instanceof HTMLInputElement) {
//       const name = e.target.id
//       const value = e.target.value
//       this.setState({ [name]: value })
//       if (name === 'rpId' && value !== 'none') {
//         console.log('Fetching privs for ', value)
//         this.getPrivs(false, value)
//       }
//     }
//   }

//   public render() {
//     return (
//       <div className={this.props.className + ' m-3'}>
//         {this.state.status && (
//           <Alert
//             message={this.state.status}
//             alertType={this.state.error ? 'danger' : 'success'}
//           />
//         )}
//         <input type='hidden' id='oldrpId' value={this.state.oldrpId} />
//         <SelectField
//           id='rpId'
//           opts={this.state.roles}
//           value={this.state.rpId}
//           onChange={this.handleChange.bind(this)}
//           otherField={true}
//         />
//         {this.state.privs[0] !== null && (
//           <PrivTable
//             privs={this.state.privs}
//             allPrivs={this.state.allPrivs}
//             onDelete={this.handleDelete.bind(this)}
//             onAdd={this.handleAdd.bind(this)}
//             rpId={this.state.rpId}
//             onChange={this.handleChange.bind(this)}
//             newPrivValue={this.state.newPriv}
//           />
//         )}
//       </div>
//     )
//   }
// }

// function AdminWireFrame(props: any) {
//   const [fields, setFields] = useState({
//     fields: props.fields,
//     modifiedFields: []
//   })

//   const comps = {
//     // routes: {
//     //   id: 'routes',
//     //   label: 'Routes',
//     //   body: <Routes />
//     // },
//     roles: {
//       id: 'roles',
//       label: 'Roles',
//       body: <Roles />
//     }
//   }
//   return (
//     <>
//       <Pills pills={comps} />
//     </>
//   )
// }

// export { AdminWireFrame }
