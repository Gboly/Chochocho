import "./follow-unfollow-poster.css"

export default function FollowUnfollowPoster({closeffPoster}) {
  return (
    <div className='ffPost-container'>
      <div className='ffPost-wrapper'>
        <header className="ffPost-header create-top-description">
          Unfollow @badBoyDev
        </header>
        <main className="ffPost-main">
          Their posts will no longer show up on your home timeline.
        </main>
        <footer className="ffPost-footer">
          <button className="ffPost-button ffPost-cancel" onClick={closeffPoster}>
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit">
            Unfollow
          </button>
        </footer>
      </div>
    </div>
  )
}
