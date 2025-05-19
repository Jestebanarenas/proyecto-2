export interface IPhoto {
  id: number;
  image_url: string;
  caption: string;
  taken_at: Date;
  issue_id: number;
}

export class Photo implements IPhoto {
  id: number;
  image_url: string;
  caption: string;
  taken_at: Date;
  issue_id: number;

  constructor(
    id: number,
    image_url: string,
    caption: string,
    issue_id: number,
    taken_at: Date = new Date()
  ) {
    this.id = id;
    this.image_url = image_url;
    this.caption = caption;
    this.taken_at = taken_at;
    this.issue_id = issue_id;
  }

  // Static method to create a Photo instance from JSON data
  static fromJson(json: any): Photo {
    return new Photo(
      json.id,
      json.image_url,
      json.caption,
      json.issue_id,
      new Date(json.taken_at)
    );
  }

  // Method to convert Photo instance to JSON
  toJson(): Record<string, any> {
    return {
      id: this.id,
      image_url: this.image_url,
      caption: this.caption,
      taken_at: this.taken_at.toISOString(),
      issue_id: this.issue_id
    };
  }

  // Method to create a photo for an issue
  createPhoto(issue_id: number, image_url: string, caption: string): void {
    // Implementation would typically involve API calls
    console.log(`Creating photo for issue ${issue_id}: ${image_url}`);
  }

  // Method to delete a photo
  deletePhoto(id: number): void {
    // Implementation would typically involve API calls
    console.log(`Deleting photo: ${id}`);
  }

  // Method to get photos by issue
  getPhotosByIssue(issue_id: number): void {
    // Implementation would typically involve API calls
    console.log(`Fetching photos for issue: ${issue_id}`);
  }
}