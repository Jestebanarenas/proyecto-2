export interface IIssue {
  id: number;
  description: string;
  issue_type: string;
  date_reported: Date;
  status: string;
  motorcycle_id: number;
}

export class Issue implements IIssue {
  id: number;
  description: string;
  issue_type: string;
  date_reported: Date;
  status: string;
  motorcycle_id: number;

  constructor(
    id: number,
    description: string,
    issue_type: string,
    motorcycle_id: number,
    date_reported: Date = new Date(),
    status: string = 'reported'
  ) {
    this.id = id;
    this.description = description;
    this.issue_type = issue_type;
    this.date_reported = date_reported;
    this.status = status;
    this.motorcycle_id = motorcycle_id;
  }

  // Static method to create an Issue instance from JSON data
  static fromJson(json: any): Issue {
    return new Issue(
      json.id,
      json.description,
      json.issue_type,
      json.motorcycle_id,
      new Date(json.date_reported),
      json.status
    );
  }

  // Method to convert Issue instance to JSON
  toJson(): Record<string, any> {
    return {
      id: this.id,
      description: this.description,
      issue_type: this.issue_type,
      date_reported: this.date_reported.toISOString(),
      status: this.status,
      motorcycle_id: this.motorcycle_id
    };
  }

  // Method to report an issue for a motorcycle
  reportIssue(motorcycle_id: number, description: string, issue_type: string): void {
    // Implementation would typically involve API calls
    console.log(`Reporting issue for motorcycle ${motorcycle_id}: ${description}`);
  }

  // Method to add a photo to an issue
  addPhoto(image_url: string, caption: string): void {
    // Implementation would typically involve API calls
    console.log(`Adding photo to issue: ${image_url}`);
  }

  // Method to update issue status
  updateIssueStatus(id: number, status: string): void {
    // Implementation would typically involve API calls
    console.log(`Updating issue ${id} status to: ${status}`);
  }

  // Method to resolve an issue
  resolveIssue(id: number): void {
    // Implementation would typically involve API calls
    console.log(`Resolving issue: ${id}`);
  }

  // Method to get issues by motorcycle
  getIssuesByMotorcycle(motorcycle_id: number): void {
    // Implementation would typically involve API calls
    console.log(`Fetching issues for motorcycle: ${motorcycle_id}`);
  }
}