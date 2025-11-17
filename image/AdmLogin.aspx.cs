using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdmLogin : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogIn_Click1(object sender, EventArgs e)
    {

         try
        {
            if (!(usertxt.Text == string.Empty))
            {
                if (!(passtxt.Text == string.Empty))
                {
                    string str = @"server=118.67.248.175;database=tcetmumbai;UID=tcetadmin;password=tcet@123";
                    String query = "select * from Login where Username = '" + usertxt.Text + "'and Password = '" + passtxt.Text + "'";
                    SqlConnection con = new SqlConnection(str);
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlDataReader dbr;
                    con.Open();
                    dbr = cmd.ExecuteReader();

                  

                    int count = 0;
                    while (dbr.Read())
                    {
                        count = count + 1;
                    }
                    if (count == 1)
                    {
                        string message = "Logged In Successfully.";
                        string UserName = usertxt.Text.Trim();
                        Session["UserName"] = UserName;
                        string url = "feedbackdata.aspx";
                        string script = "window.onload = function(){ alert('";
                        script += message;
                        script += "');";
                        script += "window.location = '";
                        script += url;
                        script += "'; }";
                        ClientScript.RegisterStartupScript(this.GetType(), "Redirect", script, true);
                        usertxt.Text = "";
                        passtxt.Text = "";

                    }
                    else if (count > 1)
                    {
                        // lblMsg.Text = "Duplicate username and password correct";
                    }
                    else
                    {

                        string message = "Invalid Username and Password.";
                        string url = "";
                        string script = "window.onload = function(){ alert('";
                        script += message;
                        script += "');";
                        script += "window.location = '";
                        script += url;
                        script += "'; }";
                        ClientScript.RegisterStartupScript(this.GetType(), "Redirect", script, true);
                        usertxt.Text = "";
                        passtxt.Text = "";
                    }
                }
                else
                {
                    //lblMsg.Text = "password empty";
                }
            }

            else
            {
                // lblMsg.Text = "username empty";
            }
            // con.Close();

        }

        catch (Exception es)
        {


        }


    }
    protected void signup_Click(object sender, EventArgs e)
    {
        Response.Redirect("signup.aspx");
    }




    protected void usertxt_TextChanged(object sender, EventArgs e)
    {
        usertxt.Text = usertxt.Text.ToUpper();
       
    }
}