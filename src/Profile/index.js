/* import {Component} from "react"
import "./index.css"

class Profile extends Component{
    state ={
        profile:{},
        apiRequest:false

    }

    componentDidMount() {
        this.getApi()
    }

    getApi = async() => {
        const url="https://apis.ccbp.in/profile"
        const response = await fetch(url)
        const data = await response.json()
        if(response.ok === true){
            const updatedData = data.profile_details.map(each => {
                name: each.name,
                profileImageUrl:each.profile_image_url,
                shortBio: each.short_bio
            })
            this.setState({profile: updatedData,apiRequest:true})
        } else{
            this.setState({apiRequest:false})
        }
    }
    

    renderProfile = () => {
        const {profile} = this.state
        const {name,profileImageUrl,shortBio} = profile
        return(
            <div className="profileContainer">
                <img src={profileImageUrl} alt="profile" className="img" />
                <h1 className="heading">{name}</h1>
                <p className="describe">{shortBio}</p>
            </div>
        )
    }
    renderRetry = () => (
        <div className="failureContainer">
            <button type="button" className="retryButton">Retry</button>
        </div>
    )

    render(){
        const {apiRequest} = this.state
        return(
            {apiRequest ? this.renderRetry() : this.renderProfile()}
            
        )
    }
}

export default Profile 

onChangeFullTime = event => {
      this.setState({employmentType:event.target.value})
  }
  onChangePartTime = event => {
      this.setState({employmentType:event.target.value})
  }
  onChangeFreelance = event => {
      this.setState({employmentType:event.target.value})
  }
  onChangeInternship = event => {
      this.setState({employmentType:event.target.value})
  }
  onChange10LPA = event => {
      this.setState({minimumPackage:event.target.value})
  }
  onChange20LPA = event => {
      this.setState({minimumPackage:event.target.value})
  }
  onChange30LPA = event => {
      this.setState({minimumPackage:event.target.value})
  }
  onChange40LPA = event => {
      this.setState({minimumPackage:event.target.value})
  }
  

  renderProfileAndCheckbox = () => {
      const {searchValue} = this.state
      return(
        <div className="topSection">
            <div className="searchContainer">
                <input type="search" placeholder="Search" value={searchValue} className="searching" />
                <BsSearch size={30} />
            </div>
            <Profile />
            <hr className="horizontal-line" />
            <div className="employmentContainer">
                <p className="describe">Type of Employment</p>
                <div className="textContainer">
                    <input type="checkbox" id="fullTime" onChange={this.onChangeFullTime}/>
                    <label htmlFor="fullTime" className="time">Full Time</label>
                </div>
                <div className="textContainer">
                    <input type="checkbox" id="partTime" onChange={this.onChangePartTime}/>
                    <label htmlFor="fullTime" className="time">Part Time</label>
                </div>
                <div className="textContainer">
                    <input type="checkbox" id="lance" onChange={this.onChangeFreelance}/>
                    <label htmlFor="lance" className="time">Freelance</label>
                </div>
                <div className="textContainer">
                    <input type="checkbox" id="internship" onChange={this.onChangeInternship}/>
                    <label htmlFor="internship" className="time">internship</label>
                </div>
            </div>
            <hr className="horizontal-line" />
            <div className="employmentContainer">
                <p className="describe">Salary Range</p>
                <div className="textContainer">
                    <input type="radio" id="10LPA" onChange={this.onChange10LPA}/>
                    <label htmlFor="10LPA" className="time">10LPA and above</label>
                </div>
                <div className="textContainer">
                    <input type="radio" id="20LPA" onChange={this.onChange20LPA}/>
                    <label htmlFor="20LPA" className="time">20LPA and above</label>
                </div>
                <div className="textContainer">
                    <input type="radio" id="30LPA" onChange={this.onChange30LPA}/>
                    <label htmlFor="30LPA" className="time">30LPA and above</label>
                </div>
                <div className="textContainer">
                    <input type="radio" id="40LPA" onChange={this.onChange40LPA}/>
                    <label htmlFor="40LPA" className="time">40LPA and above</label>
                </div>
            </div>
    
        </div>
   )
} 
renderFailureView = () => (
      {this.renderProfileAndCheckbox()}
  )

  renderLoadingView = () => (
      <div className="products-loader-container" >
          <Loader type="ThreeDots" color:"#0b69ff" height:"50" width:"50" />

      </div>
  )  
*/
