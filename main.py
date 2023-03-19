from dash import Dash, dcc, html, Input, Output, State
from dash.dependencies import ClientsideFunction
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import auth_storage

# Initialize Firebase app
cred = credentials.Certificate("C:\\Users\\mxmco\\.config\\gcloud\\authmapdemo-firebase-adminsdk-y0qfs-e6f7182a58.json")
# firebase_admin.initialize_app(cred)
EXTERNAL_STYLESHEETS = ["https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.css"]
EXTERNAL_SCRIPTS = [
    {'src': 'https://cdn.firebase.com/js/client/2.2.1/firebase.js'},
    {'src': 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'},
    {"src": "https://www.gstatic.com/firebasejs/ui/6.0.2/firebase-ui-auth.js"},
    {"src": "https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"},
    {"src": "https://www.gstatic.com/firebasejs/7.8.0/firebase-auth.js"},
    {"src": "https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js"},
    {"src": "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth-compat.js"}
    ]
app = Dash(__name__, external_stylesheets=EXTERNAL_STYLESHEETS, external_scripts=EXTERNAL_SCRIPTS)

app.layout = html.Div([
    auth_storage.AuthStorage(
        id='auth-storage',
        value='my-value',
        label='my-label'
    ),
    html.Div(id='output'),
    dcc.Store(id="my-data", storage_type="local", data=["ok"]),
    html.P(id="user"),
    html.H2("Welcome"),
    html.H1("Firebase Hosting Setup Complete"),
    html.P(["loading"], id="load"),
    html.P(["loading2"], id="load2"),
    html.P(["loading3"], id="load3"),
    html.Div(id="firebaseui-auth-container"),
    html.Button("LOGIN", id="login"),
    html.Button("LOGOUT", id="logout"),
    html.Button("CSCB", id="update-storage-button"),
], id="message")

app.clientside_callback(
    """
    function updateStorage(value) {
        // Get the dcc.Store component
        // const store = window.dash_clientside.callback_context.outputs[0].id;
        const email = localStorage.getItem('email');
        const uid = localStorage.getItem('uid');
        const mydata = localStorage.getItem('my-data')
        for (var key in localStorage) {
            console.log(key + " = " + localStorage.getItem(key));
        }
        let newData = {}
        // Use user's credentials in your application
        if (email && uid) {
            console.log("OK")
            newData = {"auth": true, "email": email, "uid": uid}; 
            console.log(newData)
        } else {
            console.log("else")
            newData = {"auth": false, "email": None, "uid": None}
        }
        console.log(email)
        console.log(uid)
        console.log(newData)
        // window.dash_clientside.callback_context.setProps({data: newData});
        return JSON.stringify(newData)
    }
    """,
    Output('user', 'children'),
    Input('update-storage-button', 'n_clicks'),
    State('my-data', 'data'),
    prevent_initial_call=True
)


@app.callback(Output('output', 'children'), Input('auth-storage', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)


@app.callback(
    Output('load3', "children"),
    Input("output", "children"),
    State("my-data", "data")
)
def update_from_localstorage(out, data):
    print(out)
    return str(data)


app.clientside_callback(
    ClientsideFunction(
        namespace='clientside',
        function_name='login_google'
    ),
    Output('load', 'children'),
    Input('login', 'n_clicks'),
    prevent_initial_call=True
)


app.clientside_callback(
    ClientsideFunction(
        namespace='clientside',
        function_name='logout_google'
    ),
    Output('load2', 'children'),
    Input('logout', 'n_clicks'),
    prevent_initial_call=True
)


if __name__ == '__main__':
    app.run_server(debug=True)