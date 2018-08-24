import * as React from 'react';
import { func, string, arrayOf, object, number } from 'prop-types';
import axios from 'axios';

const imageUploadStyle = {
    float: 'left',
    paddingTop: '10px',
    width: '105px',
    height: '105px',
    border: 'solid 5px #d1d1d1',
    color: '#d1d1d1',
    fontSize: '50px',
    fontWeight: 'bold',
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    marginBottom: '0'
}

ImageUploader.propTypes = {
    id: string.isRequired,
    images: arrayOf(object),
    handleImages: func.isRequired,
    limit: number
};

function ImageUploader({ limit = 0, images, handleImages, id }) {
    let resizeImages = async e => {
        e.preventDefault();

        if (e.target.files.length + images.length > limit && limit > 0) {
            alert(`Uploads Limited to ${limit} Image(s)`);
            return;
        }

        var formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append(i, e.target.files[i])
        }

        const res = await axios.post('/api/Images/Resize', formData)

        let imagesCopy = [
            ...images,
            ...res.data
        ]
        handleImages(imagesCopy);
    }

    let makeMainImage = index => e => {
        if (index === 0) { return; }

        let imagesCopy = [
            ...images
        ];
        let image = imagesCopy.splice(index, 1)[0];
        imagesCopy.unshift(image);

        handleImages(imagesCopy);
    }

    let removePreviewImage = index => e => {
        let imagesCopy = [
            ...images
        ];
        imagesCopy.splice(index, 1);

        handleImages(imagesCopy);
    }

    let imagePreviews = images.map((image, index) =>
        <div key={index} className='text-center image-preview pull-left' style={{ width: '135px', margin: '0px auto 5px auto' }}>
            <img
                src={image.Path}
                className='draggable img-responsive image-upload'
                style={{ margin: '0 auto', maxHeight: '75px' }}
                alt={`Upload and Resizer ${index}`}
            />
            <div className='input-group input-group-sm' style={{ margin: '0 auto', width: '114px' }}>
                {index > 0 &&
                    <span
                        className='input-group-addon bg-primary clickable'
                        onClick={makeMainImage(index)}
                        data-toggle='tooltip'
                        data-original-title='Main Image'
                    >
                        <i className='fa fa-home'></i>
                    </span>
                }
                <input className='text-center form-control image-sort' type='text' value={index || 'Main'} readOnly disabled />
                <span className='input-group-addon bg-red clickable' onClick={removePreviewImage(index)} data-toggle='tooltip' data-original-title='Delete Image'><i className='fa fa-times'></i></span>
            </div>
        </div>
    );

    return (
        <div className="col-xs-12 margin-bottom">
            <label>Add Photos</label><br />
            <label htmlFor={id} style={imageUploadStyle}><i className="fa fa-image"></i></label>
            <input onChange={resizeImages} name={id} id={id} type="file" accept=".gif,.jpg,.jpeg,.png" className="hidden" multiple={limit !== 1} />
            <div className="images-preview">
                {imagePreviews}
            </div>
        </div>
    );
}

ImageUploader.displayName = "Image Uploader";

export default ImageUploader;