from dash import Dash, dcc, html, Input, Output
from dash.dependencies import ClientsideFunction
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

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
    html.H2("Welcome"),
    html.H1("Firebase Hosting Setup Complete"),
    html.P(["loading"], id="load"),
    html.Div(id="firebaseui-auth-container"),
    html.Button(id="login")
], id="message")


app.clientside_callback(
    ClientsideFunction(
        namespace='clientside',
        function_name='firebase_init'
    ),
    Output('load', 'children'),
    Input('login', 'n_clicks'),
)


if __name__ == '__main__':
    app.run_server(debug=True)