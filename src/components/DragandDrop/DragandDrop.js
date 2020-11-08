import React, { useState } from "react";
import "../Form/Form.scss";

const DragandDrop = (props) => {
	const [uploadedImages, setUploadedImages] = useState([]);
	const [featuredImage,setFeaturedImage] = useState(null);

	const handleImageUploads =(e)=>{
		e.preventDefault();
		if(e.dataTransfer.files[0].type.includes('image') && uploadedImages.length<4){
			setUploadedImages((imagesArray)=>{
				let updatedImageArray =  [...imagesArray];
				updatedImageArray.push(URL.createObjectURL(e.dataTransfer.files[0]));
				return updatedImageArray;
			})
		}

	}
	const handleFeaturedImageCheck = (e,image,key)=>{
		 if(e.target.checked){
			 setFeaturedImage(image);
		 } 
		 else{
			 setFeaturedImage(null);
		 }
		 /*Get All Checkboxes*/
		 let checkboxes = document.querySelectorAll('.featured-image');
		 let ArrayCheckboxes = Array.from(checkboxes);
		 /*Find the other checkboxes which this event is not associated and unchek them*/
		 let filteredCheckboxes=ArrayCheckboxes.filter((checkbox)=>{
			if(parseInt(checkbox.id) !== key+1){
				return checkbox;
			}
		 })
		 filteredCheckboxes.forEach((checkbox)=>{
            checkbox.checked=false;
		 })
	      
	}
	return (
		<div>
			<div
				className="text-center border border-info p-3 w-25 m-auto"
				onDragOver={(e) => {
					e.preventDefault();
				}}
				onDrop={(e) => handleImageUploads(e) }
			>
				Drag and Drop images
				<div>
					<small className="text-secondary">max limit 4</small>
				</div>
			</div>
			{uploadedImages.length > 0 ? (
				<div className="preview-container">
					{uploadedImages.map((image, i) => {
						return (
							<div key={i}>
								<div className="preview-item" >
									<img src={image} alt={`upload-${i + 1}`} />
								</div>
								<div>
									<input type="checkbox"
									 id={i+1} 
									 onChange={(e)=>handleFeaturedImageCheck(e,image,i)} 
									 className='featured-image'
									/>
									<label style={{marginLeft:'5px'}}>Featured Image</label>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
			
				<div className="d-flex justify-content-center mt-5">
					  <button className="btn btn-primary px-4" 
					    disabled={featuredImage?false:true} onClick={()=>{
							props.storeImageInfo(btoa(featuredImage));
							props.updateStepCount();
						}}>
						  Finish
					  </button>
				</div>
		
		</div>
	);
};

export default DragandDrop;
