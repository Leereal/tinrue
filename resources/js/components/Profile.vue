<template>
     <!-- Main content -->
    <section class="content mt-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle"
                       src=""
                       alt="User profile picture">

                </div>

                <h3 class="profile-username text-center">{{form.name}}</h3>

                <p class="text-muted text-center">Software Engineer</p>

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Roles</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <strong><i class="fas fa-book mr-1"></i> Manager</strong>
                <hr>
                <strong><i class="fas fa-map-marker-alt mr-1"></i> Loan Officer</strong>
                <hr>
                <strong><i class="fas fa-pencil-alt mr-1"></i> Debt Controller</strong>
                <hr>
                <strong><i class="far fa-file-alt mr-1"></i> Chairman</strong>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">Settings</li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class=" active tab-pane" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input type="email" v-model="form.email" class="form-control" id="inputEmail" disabled="disabled" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="confirm_password" class="col-sm-2 col-form-label">Confirm Password</label>
                        <div class="col-sm-10">
                          <input type="password" class="form-control" id="confirm_password" placeholder="Confirm Password">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="job_title" class="col-sm-2 col-form-label">Job Title</label>
                        <div class="col-sm-10">
                          <select name="job_title"  id="job_title" class="form-control">
                            <option value="1">Branch Manager</option>
                            <option value="1">Loans Officer</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                          <Label for="profile_picture" class="col-sm-2 col-form-label">Profile Picture</Label>
                          <div class="col-sm-10">
                              <input type="file" class="form-input" name="photo" @change="updateProfile">
                          </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" @click.prevent="updateInfo" class="btn btn-danger">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
</template>

<script>
    export default {
        data(){
            return{
                form : new Form({
                    id:'',
                    name:'',
                    email:'',
                    password:'',
                    photo:'',

                })
            }

        },
        methods:{
            updateProfile(e){
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = (file)=>{
                    this.form.photo = reader.result;
                }
                reader.readAsDataURL(file);

            },
            updateInfo(){
                this.form.patch('api/profile').then(()=>{}).catch(()=>{});
            }

        },
      created(){
          axios.get("api/profile").then(({data})=>(this.form.fill(data)));
      },
      mounted() {
        console.log('Component mounted.')
      }
    }
</script>
