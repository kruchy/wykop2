import React from 'react';


export default class PopularPosts extends React.Component {
 render() {
        return (
<div className="sidebar">
		<div className="popular-post">
				<h3>Najpopularniejsze posty</h3>
					<div className="post-grid">
						<img src={require('../../img/img1.jpg' )} title="post1" alt=""/>
						<p>Lorem ipsum dolor sit amet consectetur dolor more normal of letters,<a href="#">[...]</a></p>					
					  </div>
					    <div className="post-grid">
							<img src={require('../../img/img1.jpg' )} title="post1" alt=""/>
							  <p>Lorem ipsum dolor sit dolor more normal consectetur of letters,<a href="#">[...]</a></p>
						</div>
						<div className="post-grid">
							<img src={require('../../img/img1.jpg' )} title="post1" alt=""/>
							  <p>Lorem ipsum dolor sit dolor more normal consectetur of letters sit amet,<a href="#">[...]</a></p>
						</div>

					<div className="view-all"><a href="#">
						</a><a href="#">ViewAll</a>
					</div>
			</div>
</div>
); }
};