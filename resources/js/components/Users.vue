<template>
  <div> 
     <div class="row mt-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Users</h3>

              <div class="card-tools">
                <button class="btn btn-success" @click="addModal"><i class="fa fa-user-plus fa-fw"></i> Add User</button>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Registered</th>                  
                    <th>Modify</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name | capitalize }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.created_at | appDate }}</td>                    
                    <td>
                      <a href="#" v-on:click="editModal(user)">
                        <i class="fa fa-edit text-green" data-toggle="tooltip" data-placement="left" title="Edit"></i>
                      </a>
                      |
                      <a href="#" @click="deleteUser(user.id)">
                        <i class="fa fa-trash text-red" data-toggle="tooltip" data-placement="left" title="Delete"></i>
                      </a>
                    </td>
                  </tr>                  
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
      </div>
      <!-- /.row -->
    <!-- Modal -->
    <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary-color text-secondary-color">
            <h5 v-show="!editmode" class="modal-title" id="exampleModalLabel">Add New User</h5>
            <h5 v-show="editmode" class="modal-title" id="exampleModalLabel">Update User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> <!-- modal header -->
          <form @submit.prevent="editmode ? updateUser() : createUser()">
          <div class="modal-body">
            <div class="form-group"> 
              <label>Name</label>
              <input v-model="form.name" type="text" name="name" placeholder="Name" 
                class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
              <has-error :form="form" field="name"></has-error>
            </div> <!-- Name Form Group -->
            <div class="form-group"> 
              <label>Email</label>
              <input v-model="form.email" type="email" name="email" placeholder="Email" 
                class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
              <has-error :form="form" field="email"></has-error>
            </div> <!-- Email Form Group -->
            <div class="form-group">
              <label>Password</label>
              <input v-model="form.password" type="password" name="password"
                class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
              <has-error :form="form" field="password"></has-error>
            </div>
          </div> <!-- modal body --> 
          <div class="modal-footer bg-primary-color text-secondary-color">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button v-show="!editmode" type="submit" class="btn btn-primary">Add User</button>
            <button v-show="editmode" type="submit" class="btn btn-success">Update User</button>
          </div> <!-- modal footer -->
        </form>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
    export default {
      
      data(){
        return{
          editmode:false,
          users:{},
          form : new Form({
            id:'',
            name:'',
            email:'',
            password:''
          })
        }
      },
      methods:{
        loadUsers(){
          this.$Progress.start()//Start Progress bar
            axios.get('api/user').then(({data})=>(this.users = data.data));//Fetch data to display
          this.$Progress.finish()//Finish Progress Bar
        },
        //Create New User Modal
        addModal(){
          this.editmode = false;
          this.form.reset();
          $('#addNew').modal('show');//Show Modal
        },
        //Create Edit User Modal
        editModal(user){
          this.editmode = true;
           this.form.reset();
           $('#addNew').modal('show');//Show Modal
           this.form.fill(user);
        },
        //Add User Function
        createUser(){
          this.$Progress.start()
            this.form.post('api/user')//Post data to server
            .then(()=>{
              toast.fire({
                icon: 'success',
                title: 'Registered Successfully'
              })
              this.$Progress.finish()              
              Fire.$emit('WhenDone');//Reload the table
              $('#addNew').modal('hide');//Hide Modal                  
            })
            .catch(()=>{
             this.$Progress.fail()
            }); 
        },
        //End Add User FunctionS
        //Update User Function
        updateUser(){      
          this.$Progress.start()
            this.form.patch('api/user/'+this.form.id)//Post data to server
            .then(()=>{
              toast.fire({
                icon: 'success',
                title: 'Updated Successfully'
              })
              this.$Progress.finish()              
              Fire.$emit('WhenDone');//reload the table
              $('#addNew').modal('hide');//Hide Modal                  
            })
            .catch(()=>{
             this.$Progress.fail()
            }); 
        },
        //End Update User FunctionS
        //Delete User Function
        deleteUser(id){
          swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {            
              //Send request to the server
              this.form.delete('api/user/'+ id).then(()=>{
                Fire.$emit('AfterCreate');
                if (result.value) {
                  swal.fire(
                    'Deleted!',
                    'Your record has been deleted.',
                    'success'
                  )
                }
              }).catch(()=>{
                swal.fire('Failed','Something went wrong!')
              })            
          })
        }

      },
      created(){
        this.loadUsers();
        Fire.$on('WhenDone',()=>{
          this.loadUsers();
        })
      },
      mounted() {
        console.log('Component mounted.')
      }
    }
</script>
