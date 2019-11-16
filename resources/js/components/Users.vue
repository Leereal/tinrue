<template>
  <div> 
     <div class="row mt-5">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Users</h3>

              <div class="card-tools">
                <button class="btn btn-success" data-toggle="modal" data-target="#addNew"><i class="fa fa-user-plus fa-fw"></i> Add User</button>
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
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.created_at }}</td>                    
                    <td>
                      <a href="#">
                        <i class="fa fa-edit text-green" data-toggle="tooltip" data-placement="left" title="Edit"></i>
                      </a>
                      |
                      <a href="#">
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
            <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div> <!-- modal header -->
          <form @submit.prevent="createUser">
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
            <button type="submit" class="btn btn-primary">Add User</button>
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
          users:{},
          form : new Form({
            name:'',
            email:'',
            password:''
          })
        }
      },
      methods:{
        loadUsers(){
          axios.get('api/user').then(({data})=>(this.users = data.data));
        },
        createUser(){
          this.form.post('api/user');
        }
      },
      created(){
        this.loadUsers();
      },
      mounted() {
        console.log('Component mounted.')
      }
    }
</script>
