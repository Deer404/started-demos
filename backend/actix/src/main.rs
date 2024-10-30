use actix_web::{web, App, Error as ActixError, HttpResponse, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::PoolError;
use serde_json::json;
use std::fmt;

mod db;
mod models;
mod schema;

use db::DbPool;
use models::{NewUser, User};

#[derive(Debug)]
struct CustomError(String);

impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl From<diesel::result::Error> for CustomError {
    fn from(err: diesel::result::Error) -> CustomError {
        CustomError(err.to_string())
    }
}

impl From<diesel::r2d2::Error> for CustomError {
    fn from(err: diesel::r2d2::Error) -> CustomError {
        CustomError(err.to_string())
    }
}

impl From<actix_web::error::BlockingError> for CustomError {
    fn from(err: actix_web::error::BlockingError) -> CustomError {
        CustomError(err.to_string())
    }
}

impl From<PoolError> for CustomError {
    fn from(err: PoolError) -> CustomError {
        CustomError(err.to_string())
    }
}

impl actix_web::error::ResponseError for CustomError {}

async fn create_user(
    pool: web::Data<DbPool>,
    new_user: web::Json<NewUser>,
) -> Result<HttpResponse, ActixError> {
    let mut conn = pool.get().map_err(CustomError::from)?;

    let user = web::block(move || {
        diesel::insert_into(schema::users::table)
            .values(&new_user.into_inner())
            .get_result::<User>(&mut *conn)
    })
    .await?
    .map_err(CustomError::from)?;

    Ok(HttpResponse::Ok().json(user))
}

async fn get_users(pool: web::Data<DbPool>) -> Result<HttpResponse, ActixError> {
    let mut conn = pool.get().map_err(CustomError::from)?;

    let users = web::block(move || schema::users::table.load::<User>(&mut *conn))
        .await?
        .map_err(CustomError::from)?;

    Ok(HttpResponse::Ok().json(users))
}

async fn get_user(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
) -> Result<HttpResponse, ActixError> {
    let mut conn = pool.get().map_err(CustomError::from)?;

    let user = web::block(move || {
        schema::users::table
            .find(user_id.into_inner())
            .first::<User>(&mut *conn)
    })
    .await?
    .map_err(CustomError::from)?;

    Ok(HttpResponse::Ok().json(user))
}

async fn update_user(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
    updated_user: web::Json<NewUser>,
) -> Result<HttpResponse, ActixError> {
    let mut conn = pool.get().map_err(CustomError::from)?;

    let user = web::block(move || {
        diesel::update(schema::users::table.find(user_id.into_inner()))
            .set(updated_user.into_inner())
            .get_result::<User>(&mut *conn)
    })
    .await?
    .map_err(CustomError::from)?;

    Ok(HttpResponse::Ok().json(user))
}

async fn delete_user(
    pool: web::Data<DbPool>,
    user_id: web::Path<i32>,
) -> Result<HttpResponse, ActixError> {
    let mut conn = pool.get().map_err(CustomError::from)?;

    let deleted_count = web::block(move || {
        diesel::delete(schema::users::table.find(user_id.into_inner())).execute(&mut *conn)
    })
    .await?
    .map_err(CustomError::from)?;

    if deleted_count == 0 {
        Ok(HttpResponse::NotFound().json(json!({"message": "User not found"})))
    } else {
        Ok(HttpResponse::Ok().json(json!({"message": "User deleted successfully"})))
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = db::establish_connection();

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .route("/users", web::post().to(create_user))
            .route("/users", web::get().to(get_users))
            .route("/users/{id}", web::get().to(get_user))
            .route("/users/{id}", web::put().to(update_user))
            .route("/users/{id}", web::delete().to(delete_user))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
