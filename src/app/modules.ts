export interface UserProfile{
  userId: Number,
  userName: string,
  createdDate: Date
}

export interface APIResponse{
    results: any;
}

export interface Media{
  id: Number,
  fileName: string,
  userId: Number,
  userName: string,
  filePath: string,
  fileLocation: string,
  description: string,
  genres: string
}

export interface Genre{
  value: string,
  viewValue: string
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
