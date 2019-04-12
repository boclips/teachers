import * as queryString from 'querystring';

class ReferAFriendUrlBuilder {
  private baseUrl: string = 'blah';
  private firstName: string;
  private lastName: string;
  private email: string;
  private view: string = 'iframe';
  private userId: string;

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  public setEmail(email: string) {
    this.email = email;
    return this;
  }

  public setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  public build(): string {
    const paramsToStringify = {
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      view: this.view,
      externalid: this.userId,
    };

    const queryParams = queryString.stringify(paramsToStringify);

    return `${this.baseUrl}&${queryParams}`;
  }
}

export default ReferAFriendUrlBuilder;
