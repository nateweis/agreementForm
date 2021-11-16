import React, {Component} from 'react';
import emailjs from 'emailjs-com';




class Form extends Component {
  constructor(props){
    super(props)
    this.ref = React.createRef();
    this.state = {
        submit : 'none',
        iBoost: false,
        iLevel: false,
        FireSystem: false,
        firstPage:["",""],
        boostPage:[false, false, false, false, false, false],
        levelPage:[false, false, false, false, false, false],
        firePage:[false, false, false, false, false, false],
        errMsg : '',
        num: 1, 
        marginLeft : 0
    }
  }

  firstPageBtn = () => { //the next btns
    let next = true
    this.state.firstPage.forEach(s => {if(!s) next = false})

    if(!next)this.setState({errMsg: "Fill out fields"})
    else if(!this.state.iBoost && !this.state.iLevel && !this.state.FireSystem) this.setState({errMsg: "Select a system"})
    else {
      if(this.state.FireSystem) this.setState({submit: 'FireSystem', errMsg: '', marginLeft : -500})
      else if(this.state.iLevel) this.setState({submit: 'iLevel', errMsg : '', marginLeft: -500})
      else if(this.state.iBoost) this.setState({submit: 'iBoost', errMsg: '', marginLeft: -500})
    }
  }
  goBack = () => {
    this.setState(pre => {
      let marg = pre.marginLeft + 500
      return {marginLeft : marg}
    })
  }
  nextBtn = (str, send) => {
    let next = true
    this.state[str].forEach(val => {if(!val) next = false})

    if(!next)this.setState({errMsg: 'Please check all the requirments'})
    else{
      
      if(send){
        this.setState({errMsg: ""})
        this.sendEmail()
      }
      else {
        this.setState((pre) => {
          let marg = pre.marginLeft - 500
          return {errMsg: "", marginLeft : marg}
        })
      }
    }

  }

  formChange = (e) => {
    if(e.target.name === 'from_name') {
      this.setState((pre) => {
        let arr = pre.firstPage
        arr[0] = e.target.value
        return {firstPage : arr}
      })
    }
    else{
      this.setState((pre) => {
        let arr = pre.firstPage
        arr[1] = e.target.value
        return {firstPage : arr}
      })
    }
  
  }


  handelCheckBox = (e) => {
    this.setState((pre) => {
      let newNum = pre.num
      e.target.checked ? newNum++ : newNum--
      return {[e.target.id]: e.target.checked, num: newNum}
    })
  }
  handelCheckBoxArr = (e) => {
    this.setState((pre) => {
      let arr = pre[e.target.name]
      arr[parseInt(e.target.value)] = e.target.checked
      return{[e.target.name]: arr}
    })
  }

  makeMessage = (name) => {
    return new Promise((resolve, reject) => {
      let string = ''
      
      const boostStr = `<h4>iBoost Form Complete By Customer</h4><h5>Customer ${name} agreed to following requriments for an iBooster job</h5>` +
      '<ul><li>Access to top floor riser gauge and/or plumbing fixture recommended to verify pressure.</li>' +
      '<li>All plumbing connections have been completed and verified in working order without leaks.</li>'+
      '<li>Correct and permanent incoming power has been completed and verified.</li>' +
      '<li>Company representative should be on site prior to technician arrival and remain for the duration of the visit to assist with items such as <ul> '+
        '<li>Equipment room access</li><li>Pressure confirmation</li><li>Air release from building piping</li><li>Expansion tank pressure adjustments</li></ul></li>' +
      '<li>All control wires (floats, transducers, actuating valves, ect...) must be brought into control panel with necessary connection fittings.</li>'+
      '<li>All systems should be installed to NYCDOB regulations. USPC is not responsible for required corrections, violations or failures issued by engineer or DOB.</li>'+
      '</ul><p>If startup is not able to be completed, there will be a fee issued of <strong>$275</strong> for a return visit. This does not apply to warranty issues of a system. </p>';

      const levelStr = `<h4>iLevel Form Complete By Customer</h4><h5>Customer ${name} agreed to following requriments for an iLevel job</h5>` +
      '<ul><li>Floats shall be set in pit and correctly labeled inside the control to verify which float corresponds to each level. If pits are not full, water must be'+
      'accessible to fill the pits to test rotation of the pumps. Pits should be cleaned of all construction material and debris.</li>' +
      '<li>All plumbing connections have been completed and verified in working order without leaks.</li>'+
      '<li>Correct and permanent incoming power has been completed and verified.</li>' +
      '<li>Company representative should be on site prior to technician arrival and remain for the duration of the visit to assist with items such as <ul> '+
        '<li>Equipment room access</li><li>Sump/sewage pit filling for testing</li></ul></li>' +
      '<li>All control wires (floats, transducers, actuating valves, ect...) must be brought into control panel with necessary connection fittings.</li>'+
      '<li>All systems should be installed to NYCDOB regulations. USPC is not responsible for required corrections, violations or failures issued by engineer or DOB.</li>'+
      '</ul><p>If startup is not able to be completed, there will be a fee issued of <strong>$275</strong> for a return visit. This does not apply to warranty issues of a system. </p>';

      const fireStr = `<h4>Fire System Form Complete By Customer</h4><h5>Customer ${name} agreed to following requriments for a Fire System job</h5>` +
      '<ul><li>The entire system is required to be filled in order to start and program the system correctly. A partial startup is not acceptable and USPC is not responsible fro issues'+
      'that may stem for a partial startup. A fire pump should never be used to pressurize lines even to check leaks.</li>' +
      '<li>All plumbing connections have been completed and verified in working order without leaks.</li>'+
      '<li>Correct and permanent incoming power has been completed and verified.</li>' +
      '<li>Company representative should be on site prior to technician arrival and remain for the duration of the visit to assist with items such as <ul> '+
        '<li>Equipment room access</li><li>Air release from building piping</li></ul></li>' +
      '<li>All control wires (floats, transducers, actuating valves, ect...) must be brought into control panel with necessary connection fittings.</li>'+
      '<li>All systems should be installed to NYCDOB regulations. USPC is not responsible for required corrections, violations or failures issued by engineer or DOB.</li>'+
      '</ul><p>If startup is not able to be completed, there will be a fee issued of <strong>$275</strong> for a return visit. This does not apply to warranty issues of a system. </p>';

      if(this.state.iBoost) string = string + boostStr
      if(this.state.iLevel) string = string + levelStr
      if(this.state.FireSystem) string = string + fireStr
      
      resolve(this.setState({email: string}))
    })
  }

  sendEmail = () => {

    this.makeMessage(this.ref.current[0].value)
    .then(() => {
      emailjs.sendForm('service_qigqh8m', 'template_7cofd7b', this.ref.current, 'user_PjMgAx2yK5zLNvRNhHRre')
      .then((result) => {
          console.log(result.text);
          this.ref.current.reset()
          this.props.submitedForm(true)
      }, (error) => {
          console.log(error.text);
      });

    })

  };



  render(){
    return(
      <div>
        
        <div className="slideContainer">

          <div className="allSlides" style={{width: `${this.state.num * 515}px`}}>

            <div className="slide" style={{marginLeft : `${this.state.marginLeft}px`}}>

              <div className="err"> {this.state.errMsg} </div>
              <h5>Please give your contact information</h5>
              <form ref={this.ref}> 
                <textarea name="message" wrap="hard" cols="30" rows="10" value={this.state.email} style={{opacity:'0', position:'absolute', zIndex: '-100'}} readOnly></textarea>
                <input type="text" placeholder="Name" name="from_name" onChange={this.formChange} />
                <input type="text" name="reply_to" placeholder="Email" onChange={this.formChange} />
              </form>

              <h5>Select one or more systems</h5>
              <div style={style.options}>
                <div><input className="form-check-input" type="checkbox" onChange={this.handelCheckBox} id='iBoost' value="iBoost"/> iBoost</div>
                <div><input type="checkbox" className="form-check-input" onChange={this.handelCheckBox} id='iLevel' value="iLevel"/> iLevel</div>
                <div> <input type="checkbox" className="form-check-input" onChange={this.handelCheckBox} id='FireSystem' value="Fire System"/>Fire System</div>
              </div>

              <button className="btn btn-light" onClick={this.firstPageBtn}>Next</button>
            </div>

          <div className="slide" style={this.state.iBoost? style.visible: style.hidden}>
            <h3>iBoost Requirements</h3>
            <h5>please make sure all the requriments listed below are met</h5>
              <div className="err"> {this.state.errMsg} </div>

              <ul>
                <li><input type="checkbox" className="form-check-input" name="boostPage" value="0" onChange={this.handelCheckBoxArr}/>
                Access to top floor riser gauge and/or plumbing fixture recommended to verify pressure.</li>
                <li><input type="checkbox" className="form-check-input" name="boostPage" value="1" onChange={this.handelCheckBoxArr}/>
                All plumbing connections have been completed and verified in working order without leaks.</li>
                <li><input type="checkbox" className="form-check-input" name="boostPage" value="2" onChange={this.handelCheckBoxArr}/>
                Correct and permanent incoming power has been completed and verified.</li>
                <li><input type="checkbox" className="form-check-input" name="boostPage" value="3" onChange={this.handelCheckBoxArr}/>
                Company representative should be on site prior to technician arrival and remain for the duration of the visit to assist with items such as <ul>
                  <li>Equipment room access</li>
                  <li>Pressure confirmation</li>
                  <li>Air release from building piping</li>
                  <li>Expansion tank pressure adjustments</li>
                </ul></li>
                <li><input type="checkbox" className="form-check-input" name="boostPage" value="4" onChange={this.handelCheckBoxArr}/>
                All control wires (floats, transducers, actuating valves, ect...) must be brought into control panel with necessary connection fittings.</li>
                <li><input type="checkbox" className="form-check-input" name="boostPage" value="5" onChange={this.handelCheckBoxArr}/>
                All systems should be installed to NYCDOB regulations. USPC is not responsible for required corrections, violations or failures issued by engineer or DOB.</li>
              </ul>

              <p>If startup is not able to be completed, there will be a fee issued of <strong>$275</strong> for a return visit. This does not apply to warranty issues of a system. </p>
              <button className="btn btn-light" onClick={this.goBack}>Back</button>
              <button className="btn btn-light" onClick={()=>this.nextBtn("boostPage", this.state.submit === 'iBoost'? true: false)}>
                {this.state.submit === 'iBoost'? 'Submit': 'Next'}
              </button>
            </div>

            <div className="slide" style={this.state.iLevel? style.visible: style.hidden}>
              <h3>iLevel Requirements</h3>
              <h5>please make sure all the requriments listed below are met</h5>
              <div className="err"> {this.state.errMsg} </div>

              <ul>
                <li><input type="checkbox" className="form-check-input" name="levelPage" value="0" onChange={this.handelCheckBoxArr}/>
                Floats shall be set in pit and correctly labeled inside the control to verify which float corresponds to each level. If pits are not full, water must be 
                accessible to fill the pits to test rotation of the pumps. Pits should be cleaned of all construction material and debris.</li>
                <li><input type="checkbox" className="form-check-input" name="levelPage" value="1" onChange={this.handelCheckBoxArr}/>
                All plumbing connections have been completed and verified in working order without leaks.</li>
                <li><input type="checkbox" className="form-check-input" name="levelPage" value="2" onChange={this.handelCheckBoxArr}/>
                Correct and permanent incoming power has been completed and verified.</li>
                <li><input type="checkbox" className="form-check-input" name="levelPage" value="3" onChange={this.handelCheckBoxArr}/>
                Company representative should be on site prior to technician arrival and remain for the duration of the visit to assist with items such as <ul>
                  <li>Equipment room access</li>
                  <li>Sump/sewage pit filling for testing</li>
                </ul></li>
                <li><input type="checkbox" className="form-check-input" name="levelPage" value="4" onChange={this.handelCheckBoxArr}/>
                All control wires (floats, transducers, actuating valves, ect...) must be brought into control panel with necessary connection fittings.</li>
                <li><input type="checkbox" className="form-check-input" name="levelPage" value="5" onChange={this.handelCheckBoxArr}/>
                All systems should be installed to NYCDOB regulations. USPC is not responsible for required corrections, violations or failures issued by engineer or DOB.</li>
              </ul>

              <p>If startup is not able to be completed, there will be a fee issued of <strong>$275</strong> for a return visit. This does not apply to warranty issues of a system. </p>
              <button className="btn btn-light" onClick={this.goBack}>Back</button>
              <button className="btn btn-light" onClick={()=>this.nextBtn("levelPage", this.state.submit === 'iLevel'? true: false)}>{this.state.submit === 'iLevel'? 'Submit': 'Next'}</button>
            </div>

            <div className="slide" style={this.state.FireSystem? style.visible: style.hidden}>
              <h3>Fire System Requirements</h3>
              <h5>please make sure all the requriments listed below are met</h5>
              <div className="err"> {this.state.errMsg} </div>

              <ul>
                <li><input type="checkbox" className="form-check-input" name="firePage" value="0" onChange={this.handelCheckBoxArr}/>
                The entire system is required to be filled in order to start and program the system correctly. A partial startup is not acceptable and USPC is not responsible fro issues
                that may stem for a partial startup. A fire pump should never be used to pressurize lines even to check leaks.</li>
                <li><input type="checkbox" className="form-check-input" name="firePage" value="1" onChange={this.handelCheckBoxArr}/>
                All plumbing connections have been completed and verified in working order without leaks.</li>
                <li><input type="checkbox" className="form-check-input" name="firePage" value="2" onChange={this.handelCheckBoxArr}/>
                Correct and permanent incoming power has been completed and verified.</li>
                <li><input type="checkbox" className="form-check-input" name="firePage" value="3" onChange={this.handelCheckBoxArr}/>
                Company representative should be on site prior to technician arrival and remain for the duration of the visit to assist with items such as <ul>
                  <li>Equipment room access</li>
                  <li>Air release from building piping</li>
                </ul></li>
                <li><input type="checkbox" className="form-check-input" name="firePage" value="4" onChange={this.handelCheckBoxArr}/>
                All control wires (floats, transducers, actuating valves, ect...) must be brought into control panel with necessary connection fittings.</li>
                <li><input type="checkbox" className="form-check-input" name="firePage" value="5" onChange={this.handelCheckBoxArr}/>
                All systems should be installed to NYCDOB regulations. USPC is not responsible for required corrections, violations or failures issued by engineer or DOB.</li>
              </ul>

              <p>If startup is not able to be completed, there will be a fee issued of <strong>$275</strong> for a return visit. This does not apply to warranty issues of a system. </p>
              <button className="btn btn-light" onClick={this.goBack}>Back</button>
              <button className="btn btn-light" onClick={()=>this.nextBtn("firePage", this.state.submit === 'FireSystem'? true: false)}>{this.state.submit === 'FireSystem'? 'Submit': 'Next'}</button>
            </div>

          </div>

        </div>
        
      </div>
    )
  }
}

const style = {
  options: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  visible:{
    display: 'block',
    listStyle: 'none'
  },
  hidden:{
    display: 'none'
  },
  allSlides:{
    display: 'flex'
  }
}

export default Form;
