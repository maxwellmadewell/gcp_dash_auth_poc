class Auth:
    def __init(self):
        self.uid = ""
        self.display_name = ""
        self.email = ""
        self.email_verified = ""

    def check(self):
        if not all(self.uid, self.email, self.email_verified):
            print("Not Verified")
            return False
        else:
            print("Verified")
            return True

    def set_auth(self, uid: str, display_name: str, email: str, email_verified: bool) -> None:
        self.uid = uid
        self.display_name = display_name
        self.email = email
        self.email_verified = email_verified

    def unset_auth(self):
        self.uid = ""
        self.display_name = ""
        self.email = ""
        self.email_verified = ""