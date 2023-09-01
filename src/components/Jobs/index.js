import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureViewImg =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class Jobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkboxInputs: [],
    radioInput: '',
    searchInput: '',
    apiJobStatus: apiJobsStatusConstants.initial,
    apiStatus: apiStatusConstants.initial,
    responseSuccess: false,
  }

  componentDidMount() {
    this.onGetProfiles()
    this.onGetJobDetails()
  }

  onGetProfiles = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, optionsProfile)
    if (response.ok === true) {
      const data = [await response.json()]
      const updatedData = data.map(each => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      console.log(updatedData)
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
        responseSuccess: true,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetJobDetails = async () => {
    this.setState({apiJobStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchInput} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobsUrl, optionsJobs)

    if (responseJobs.ok === true) {
      const JobsData = await responseJobs.json()
      const updatedJobsData = JobsData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobsDescription: each.jobs_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedJobsData)
      this.setState({
        jobsData: updatedJobsData,
        apiJobStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobsStatusConstants.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.onGetJobDetails)
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({checkboxInputs: filteredData}, this.onGetJobDetails)
    }
  }

  onGetProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profileContainer">
          <img src={profileImageUrl} alt="profile" className="img" />
          <h1 className="heading">{name}</h1>
          <p className="describe">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfiles()
  }

  onGetProfileFailureView = () => (
    <div className="failure-button-container">
      <button
        type="button"
        className="failure-button"
        onClick={this.onRetryProfile}
      >
        retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onGetProfileView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      default:
        return null
    }
  }

  onRetryJobs = () => {
    this.onGetJobDetails()
  }

  onGetJobsFailureView = () => (
    <div className="failure-img-button-container">
      <img className="failure-img" src={failureViewImg} alt="failure view" />
      <h1 className="failure-heading">Oops! Something Went wrong</h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>
      <div className="jobs-failure-buttonContainer">
        <button
          className="failure-button"
          type="button"
          onClick={this.onRetryJobs}
        >
          retry
        </button>
      </div>
    </div>
  )

  onGetJobsView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="ul-job-items-container">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  onRenderJobsStatus = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobsStatusConstants.success:
        return this.onGetJobsView()
      case apiJobsStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiJobsStatusConstants.failure:
        return this.onGetJobsFailureView()
      default:
        return null
    }
  }

  onGetCheckBoxesView = () => (
    <ul className="check-boxes-container">
      {employmentTypesList.map(eachItem => (
        <li className="li-container" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonView = () => (
    <ul className="radio-button-container">
      {salaryRangesList.map(each => (
        <li className="li-container" key={each.salaryRangeId}>
          <input
            className="radio"
            id={each.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onGetRadioOption}
          />
          <label className="label" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobDetails()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="side-bar-container">
            {this.onRenderProfileStatus()}
            <hr className="horizontal-line" />
            <h1 className="text">Type of Employment</h1>
            {this.onGetCheckBoxesView()}
            <hr className="horizontal-line" />
            <h1 className="text">Salary Range</h1>
            {this.onGetRadioButtonView()}
          </div>
          <div className="jobs-container">
            <div>
              <input
                className="search-input"
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-Button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.onRenderJobsStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
